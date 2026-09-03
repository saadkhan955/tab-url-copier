# Tab URL Copier

> **A lightweight, privacy-first Chrome extension to copy, search, group, and export open browser tabs in Plain Text, Markdown, HTML, or JSON.**

[![Chrome Web Store Version](https://img.shields.io/badge/Chrome%20Web%20Store-v1.2.0-blue.svg)](https://chromewebstore.google.com/detail/tab-url-copier/fhkocldllnchmfekafbocojebfajiaic)
[![Extension Size](https://img.shields.io/badge/Extension%20Size-13.9%20KiB-green.svg)](https://tuc.khansaad.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Privacy: 100% Local](https://img.shields.io/badge/Privacy-100%25%20Local-emerald.svg)](https://tuc.khansaad.dev/privacy.html)

---

## ⚡ Core Features

* **Multi-Format Clipboard Copying:**
  * **Plain Text:** Clean newline-separated URLs (`https://...`)
  * **Markdown:** Formatted links with titles (`[Title](https://...)`)
  * **HTML:** Anchor tags (`<a href="...">Title</a>`)
  * **JSON:** Structured arrays (`[{"title": "...", "url": "..."}]`)
* **One-Click File Exports:** Save your formatted tabs directly to disk as `.txt`, `.md`, `.html`, or `.json` files.
* **Smart Domain Grouping:** Automatically groups open tabs by website domain (`github.com`, `youtube.com`, `stackoverflow.com`) with 1-click domain-level selection.
* **Real-Time Live Search:** Instantly filter hundreds of open tabs by page title or URL keywords.
* **Multi-Window Scope:** Toggle between scanning tabs in your current active window or across all open Chrome windows.
* **Native Chrome Selection Sync:** Automatically pre-checks tabs you've highlighted in Chrome's tab strip (via `Shift` or `Cmd/Ctrl`-click).
* **System Dark & Light Themes:** Automatically matches your operating system appearance with clean, high-contrast UI.

---

## 🔒 Privacy & Architecture

Tab URL Copier is built with an uncompromising **local-first architecture**:
* **100% On-Device Processing:** Tab titles and URLs are processed strictly in browser memory.
* **Zero External Network Requests:** The extension contains zero backend servers, zero telemetry libraries, and zero tracking cookies.
* **No Account Required:** Works immediately upon install with zero signup.
* **Lightweight Footprint:** Entire packaged extension is only **13.9 KiB**.

### Minimal Permissions Required:
* `tabs`: Used solely to read active tab URLs and titles so you can select which links to export. (Does not collect or record your general browsing history).
* `clipboardWrite`: Used solely to write your formatted text, Markdown, HTML, or JSON links to your clipboard when you click **Copy**.

---

## 🚀 Installation

### Option 1: Official Chrome Web Store
Install directly from the [Chrome Web Store Listing](https://chromewebstore.google.com/detail/tab-url-copier/fhkocldllnchmfekafbocojebfajiaic).

### Option 2: Load Unpacked (Development)
1. Clone or download this repository:
   ```bash
   git clone https://github.com/saadkhan955/tab-url-copier.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the `tab-url-copier` folder.
5. Pin **Tab URL Copier** to your Chrome toolbar for instant access!

---

## 📁 Project Structure

```text
tab-url-copier/
├── manifest.json       # Chrome Extension Manifest V3 configuration
├── popup.html          # Popup UI structure & format buttons
├── popup.js            # URL formatting, search, domain grouping & clipboard logic
├── popup.css           # Modern Dark/Light mode styles
├── icon16.png          # 16x16 toolbar icon
├── icon48.png          # 48x48 extensions management icon
├── icon128.png         # 128x128 store display icon
├── public/             # Marketing landing page & privacy policy (tuc.khansaad.dev)
└── store-assets/       # Chrome Web Store promotional tiles & screenshots
```

---

## 👨‍💻 Developer & Support

* **Developer:** [Saad Khan](https://khansaad.dev) — Drupal & Full-Stack Engineer
* **Official Website:** [https://tuc.khansaad.dev/](https://tuc.khansaad.dev/)
* **Support / Contact:** `contact@khansaad.dev`
* **License:** [MIT](LICENSE)
