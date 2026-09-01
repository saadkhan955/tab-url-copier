# Tab URL Copier

A minimal Chrome extension: open the popup, check the tabs you want, click **Copy URLs**, and all selected URLs land on your clipboard (one per line).

## Load it (unpacked, for development)

1. Unzip this folder somewhere permanent (don't delete it after loading — Chrome loads unpacked extensions directly from disk).
2. Go to `chrome://extensions`.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the `tab-url-copier` folder.
5. Pin the extension (puzzle-piece icon in the toolbar → pin) for easy access.

## Usage

- Click the extension icon. It lists all tabs in your **current window**.
- Check the ones you want, or use **Select all** / **None**.
- **If you already selected multiple tabs in Chrome itself** (Ctrl/Cmd-click or Shift-click on
  tabs in the tab strip) before opening the popup, those tabs are **automatically pre-checked** —
  a blue banner confirms this and lets you **Clear** the selection if you'd rather pick manually.
- Click **Copy URLs** — they're copied newline-separated, ready to paste anywhere.

## Notes / easy tweaks

- **All windows instead of current window only**: in `popup.js`, change
  `chrome.tabs.query({ currentWindow: true })` to `chrome.tabs.query({})`.
- **Different output format** (e.g. Markdown links `[title](url)` or comma-separated):
  edit the `copySelectedUrls()` function in `popup.js` where `selectedUrls.join("\n")` is built.
- **Keyboard shortcut to open the popup**: Chrome lets users set one at
  `chrome://extensions/shortcuts` automatically for any extension with a popup — no code needed.
- Icons are placeholders generated for this build; swap `icon16.png` / `icon48.png` / `icon128.png`
  for your own branding any time.

## Publishing to the Chrome Web Store (optional, later)

Zip the folder contents (not the folder itself) and upload via the
[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) — there's a
one-time $5 developer registration fee.
