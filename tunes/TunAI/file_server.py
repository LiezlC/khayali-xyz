"""
Simple local file server for DistroKid uploads.
Run this script, then Claude can upload files via Chrome.
Press Ctrl+C to stop.
"""
import http.server
import os
import sys

PORT = 8765
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dkREADY")

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == "__main__":
    print(f"Serving files from: {DIRECTORY}")
    print(f"Server running at http://localhost:{PORT}")
    print(f"Press Ctrl+C to stop")
    
    with http.server.HTTPServer(("", PORT), CORSHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
