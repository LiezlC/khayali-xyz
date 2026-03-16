# DistroKid Bulk Upload Automation

Automated single-by-single upload to DistroKid for **khayali / 11138307 Records DK**.

## What it does

Loops through all tracks in `dk_tracks.json`, and for each one:
1. Navigates to `distrokid.com/new/`
2. Ticks ALL service checkboxes (Snapchat, MediaNet, Roblox, + any new ones)
3. Handles the Roblox eligibility dialog automatically
4. Sets genre & subgenre
5. Fills track title, songwriter (Liezl Claassen), Apple Music credits (khayali)
6. Sets instrumental/vocal flag per track
7. Uploads cover art PNG and audio WAV
8. Ticks all mandatory confirmation checkboxes
9. Clicks Continue to submit
10. Waits for upload, handles the Mixea page ("Use my originals")
11. Updates `dk_tracks.json` status to "uploaded" so you can resume if interrupted

## Setup (one time)

```powershell
# In PowerShell or Command Prompt:
pip install playwright
playwright install chromium
```

That's it. No other dependencies.

## Usage

### Preview what will be uploaded (dry run)
```powershell
cd C:\Users\Liezl\Music\TunAI
python dk_upload.py --dry-run
```
This checks that all PNG/WAV files exist and shows what would be uploaded.

### Upload all pending tracks
```powershell
python dk_upload.py
```
The first time, it opens a browser window where you log in to DistroKid manually. After that, the login session is saved in `.dk_browser_profile/` so you won't need to log in again.

### Upload a single track
```powershell
python dk_upload.py --track "Sideways"
```

### Resume from a specific track (0-indexed)
```powershell
python dk_upload.py --start-from 5
```

### Debug mode (slow down all actions)
```powershell
python dk_upload.py --slow 500
```

## File structure

```
C:\Users\Liezl\Music\TunAI\
├── dk_upload.py          ← the automation script
├── dk_tracks.json        ← track metadata (genres, filenames, upload status)
├── file_server.py        ← (no longer needed — Playwright uploads directly)
├── DK_UPLOAD_README.md   ← this file
├── dkREADY/
│   ├── All_The_One.wav
│   ├── All_The_One.png
│   ├── Sideways.wav
│   ├── Sideways.png
│   └── ...
└── .dk_browser_profile/  ← created automatically, stores login session
```

## Customising

### Adding new tracks
Edit `dk_tracks.json` and add entries to the `"tracks"` array:
```json
{
  "title": "My New Track",
  "wav": "My_New_Track.wav",
  "png": "My_New_Track.png",
  "genre": "9",
  "subgenre": "52",
  "instrumental": true,
  "status": "pending"
}
```

### Genre/subgenre codes
All codes are in `dk_tracks.json` under `genre_map` and `subgenre_map`.

Common ones:
- Electronic = `"9"`, Tech House = `"52"`, Techno = `"53"`, House = `"46"`, Deep House = `"55"`
- Singer/Songwriter = `"29"` (no subgenre)
- World = `"32"` (no subgenre)

### Timing
If DistroKid is slow, increase the `DELAY_*` constants near the top of `dk_upload.py`.

## How it differs from the Chrome extension approach

| | Claude + Chrome Extension | This script (Playwright) |
|---|---|---|
| Speed | ~15 min per track | ~2-3 min per track |
| Attention needed | Constant (each step needs a tool call) | Just log in, then walk away |
| Resumability | Loses context after ~2-3 tracks | Picks up where it left off via JSON status |
| File upload | Needs localhost HTTP server hack | Native file input — no server needed |
| Cost | Expensive (Opus context window) | Free (runs locally) |

## Troubleshooting

**"Could not find Continue button"** — DistroKid may have changed their page layout. The script will pause and let you click manually.

**Upload seems stuck** — Large WAV files take time. The script waits up to 5 minutes per track.

**Login expired** — Delete the `.dk_browser_profile` folder and run again to get a fresh login.

**Roblox dialog not handled** — If they change the dialog text, update the label text patterns in `handle_roblox_dialog()`.

## Tracks with special handling

- **I Just Asked, Probably, WHEN YOU ASK SOFTLY**: Singer-Songwriter genre, instrumental=false (has vocals)
- **The Reckoning**: World genre, no subgenre
- **Lawful Still Afraid, Meaning Maintenance**: Genre was TBD — defaulted to Electronic/Electronica-Downtempo and Electronic/Minimal-Deep Tech respectively. Edit `dk_tracks.json` to change if needed.
- **Lanterns for the Unseen**: Already uploaded in a previous session — not in the track list.

## Future: Partnership Dividend EP
When the art is ready for the 5 PointOfContact mixes, add them to `dk_tracks.json` the same way. The script handles any track you add.
