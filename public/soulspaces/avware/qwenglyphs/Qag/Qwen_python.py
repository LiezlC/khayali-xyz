import sys
import json

def process_file(path):
    # Simulated extraction
    return {
        "project_id": path.split("/")[-1],
        "patterns": ["Pattern: Resettlement delays due to insufficient consultation"],
        "best_practices": ["Best Practice: Early baseline surveys"]
    }

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("paths", nargs="+")
    args = parser.parse_args()

    results = []
    for path in args.paths:
        results.append(process_file(path))

    print(json.dumps(results))