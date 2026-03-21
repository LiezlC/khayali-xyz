import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-static';

export async function GET() {
  const articlesDir = path.join(process.cwd(), 'sociablesystems', 'articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  const episodes: { number: number; title: string; date: string; excerpt: string; content: string }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const { data, content } = matter(raw);
    const epMatch = file.match(/Episode_(\d+)/);
    if (!epMatch) continue;
    const num = parseInt(epMatch[1]);

    // Convert markdown to basic HTML
    let html = content
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[hbp])/gm, '');

    html = `<p>${html}</p>`;

    // Convert YouTube URLs to embeds
    html = html.replace(
      /https:\/\/(?:youtu\.be\/|www\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/g,
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
    );

    episodes.push({
      number: num,
      title: data.title || `Episode ${num}`,
      date: data.date || '2026-01-08',
      excerpt: data.excerpt || '',
      content: html,
    });
  }

  episodes.sort((a, b) => a.number - b.number);

  const escXml = (s: string) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const items = episodes.map(ep => `
    <item>
      <title>${escXml(ep.title)}</title>
      <link>https://khayali.xyz/sociablesystems/episode-${ep.number}</link>
      <guid isPermaLink="true">https://khayali.xyz/sociablesystems/episode-${ep.number}</guid>
      <pubDate>${new Date(ep.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${escXml(ep.excerpt)}</description>
      <content:encoded><![CDATA[${ep.content}]]></content:encoded>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sociable Systems</title>
    <link>https://khayali.xyz/sociablesystems</link>
    <description>AI Accountability in High-Stakes Operations — 80 episodes across 11 thematic arcs exploring how complex systems behave under real-world pressure.</description>
    <language>en</language>
    <atom:link href="https://khayali.xyz/feed" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
