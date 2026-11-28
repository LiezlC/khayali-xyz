"""Check emitted Next pages and deployed standalone HTML. No dependencies.

Run after npm run build. Add --base-url https://www.khayali.xyz to check
the same pages over HTTP with LinkedIn's crawler user agent.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import fnmatch
from html.parser import HTMLParser
from pathlib import Path
import subprocess
from urllib.parse import quote, unquote, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://www.khayali.xyz"
ALIASES = {
    "/observatory/index.html": "/observatory",
    "/observatory/three-body-studio.html": "/observatory/three-body",
    "/creative/creative-content.html": "/creative",
    "/your-song/index.html": "/your-song",
    "/utopai/index.html": "/utopai",
}


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.values = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        key = None
        if tag == "link" and attrs.get("rel") == "canonical":
            key, value = "canonical", attrs.get("href", "")
        elif tag == "meta":
            key = attrs.get("property", attrs.get("name"))
            value = attrs.get("content", "")
        if key:
            self.values.setdefault(key, []).append(value)


def pages():
    built = ROOT / ".next/server/app"
    if not built.exists():
        raise SystemExit("Run npm run build first")
    for path in built.rglob("*.html"):
        route = "/" + path.relative_to(built).as_posix()[:-5]
        if route == "/_not-found":
            continue
        yield path, "/" if route == "/index" else route
    patterns = [line.strip().lstrip("/") for line in
                (ROOT / ".vercelignore").read_text().splitlines()
                if line.strip() and not line.startswith("#")]
    tracked = subprocess.check_output(
        ["git", "ls-files", "public"], cwd=ROOT, text=True).splitlines()
    for name in tracked:
        if not name.endswith(".html") or "/_" in name:
            continue
        if any(name.startswith(p) if p.endswith("/") else
               fnmatch.fnmatch(name, p) for p in patterns):
            continue
        path = ROOT / name
        # HTML fragments and the legacy text-only export aren't entry pages.
        if "<html" not in path.read_text(encoding="utf-8").lower():
            continue
        yield path, "/" + name.removeprefix("public/")


def check(item, base_url):
    path, route = item
    try:
        if base_url:
            request = Request(base_url.rstrip("/") + quote(route, safe="/%"),
                              headers={"User-Agent": "LinkedInBot/1.0"})
            with urlopen(request, timeout=30) as response:
                source = response.read().decode("utf-8")
        else:
            source = path.read_text(encoding="utf-8")
        head = Head()
        head.feed(source)
        expected = SITE + ("" if route == "/" else quote(ALIASES.get(route, route), safe="/%"))
        errors = []
        for key in ("canonical", "og:url"):
            if head.values.get(key) != [expected]:
                errors.append(f"{key}: {head.values.get(key)}; expected {expected}")
        for key in ("og:title", "og:description", "og:image", "twitter:title",
                    "twitter:card", "twitter:image"):
            if len(head.values.get(key, [])) != 1 or not head.values[key][0]:
                errors.append(f"missing or duplicate {key}")
        return route, errors, head.values.get("og:image", [])
    except Exception as error:
        return route, [str(error)], []


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url")
    args = parser.parse_args()
    entries = list(pages())
    with ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(lambda item: check(item, args.base_url), entries))
    failed = [(route, errors) for route, errors, _ in results if errors]
    images = {image for _, _, values in results for image in values}
    for image in sorted(images):
        try:
            if args.base_url:
                target = image.replace(SITE, args.base_url.rstrip("/"), 1)
                with urlopen(Request(target, headers={"User-Agent": "LinkedInBot/1.0"}), timeout=30) as response:
                    if not response.headers.get("Content-Type", "").startswith("image/"):
                        raise ValueError("response is not an image")
            elif image.startswith(SITE + "/"):
                path = ROOT / "public" / unquote(urlsplit(image).path).lstrip("/")
                if not path.is_file():
                    raise ValueError("image file is missing")
        except Exception as error:
            failed.append((image, [str(error)]))
    for route, errors in failed:
        print(route + ": " + "; ".join(errors))
    print(f"Checked {len(results)} pages and {len(images)} images; {len(failed)} failures")
    raise SystemExit(bool(failed))
