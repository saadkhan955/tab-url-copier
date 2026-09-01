# Chrome Web Store Listing — Tab URL Copier

> Last Updated: 2026-07-08

---

## Store Listing

### Extension Name
`Tab URL Copier`

### Short Description
`Select multiple open tabs in your window and copy all their URLs to your clipboard at once.`

### Detailed Description
```
Tab URL Copier is a lightweight, privacy-focused tool that lets you copy multiple open tab URLs at once with a single click. No more copying tabs one by one.

Key Features:
- Lists all open tabs in your current browser window.
- Quick buttons to Select All tabs or Clear all selections.
- Smart browser pre-selection: if you highlight multiple tabs in your browser strip (using Shift or Ctrl/Cmd selection) before clicking the icon, those tabs are pre-checked automatically.
- Automatic theme selection following your system dark/light preferences.
- Sleek manual toggle override in the header to switch between Light, Dark, and Auto sync modes.
- Lightweight vanilla code with smooth animations and zero external dependencies.

How to use it:
1. Click the Tab URL Copier icon in your toolbar.
2. Check the tabs you wish to copy (or click "Select all").
3. Click "Copy URLs".
4. Your selected URLs are copied to your clipboard, newline-separated, ready to paste anywhere!

Privacy & Permissions:
All data is processed strictly local to your device. Tab URL Copier does not collect, store, or transmit any personal data, analytics, or browsing history.
```

### Category
`Productivity` (or `Developer Tools`)

### Single Purpose
`Select multiple open tabs in your window and copy all their URLs to your clipboard at once.`

### Primary Language
`English`

---

## Graphics & Assets

| Asset | Dimensions | Status | Filename / Description |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | `icon128.png` |
| Extension Icon | 48×48 PNG | ✅ Ready | `icon48.png` |
| Extension Icon | 16×16 PNG | ✅ Ready | `icon16.png` |
| Screenshot 1 | 1280×800 or 640×400 | ✅ Ready | `screenshot_light.jpg` |
| Screenshot 2 | 1280×800 or 640×400 | ✅ Ready | `screenshot_dark.jpg` |
| Small Promo Tile | 440×280 | ✅ Ready | `small_promo_tile.jpg` |

---

## Permissions Justification

Every permission listed in `manifest.json` is justified below for review:

| Permission | Type | Justification |
|------------|------|---------------|
| `tabs` | permissions | Required to retrieve the URLs and page titles of open tabs in the current window so that users can select which tabs they want to copy. |
| `clipboardWrite` | permissions | Required to write the selected, newline-separated tab URLs directly onto the system clipboard when the user clicks "Copy URLs". |

---

## Privacy & Data Use

### Data Collection
**Does the extension collect user data?** No

This extension does not collect, store, or transmit any user data, personally identifiable info, financial info, location, web history, or site activities. Everything operates locally inside the isolated extension environment and system clipboard.

### Data Use Certification
- [x] Data is NOT sold to third parties.
- [x] Data is NOT used for purposes unrelated to the extension's core functionality.
- [x] Data is NOT used for creditworthiness or lending purposes.

---

If requested by the Chrome Web Store, the live privacy policy is hosted at:
**`https://tuc.khansaad.dev/privacy.html`**

```
Privacy Policy for Tab URL Copier

Last updated: 2026-09-01

Tab URL Copier does not collect, store, or transmit any personal data, credentials, browsing activity, or system information. All calculations and clipboard operations occur locally on your device.

This extension does not use tracking cookies, analytics engines, or make external network calls. Your preferences (such as light/dark mode override) are stored locally in the browser's localStorage and never leave your machine.
```

---

## Distribution

- **Visibility**: Public
- **Regions**: All regions
- **Pricing**: Free

---

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| `1.2.0` | 2026-07-17 | Added multi-format export (Markdown, HTML, JSON), domain grouping, real-time tab search, and multi-window scope. | Published |
| `1.1.0` | 2026-07-08 | Upgraded UI, custom checkboxes, and added system-integrated Light/Dark theme toggling. | Published |

---

## Review Notes & Pre-Publish Checklist

1. [ ] **Zip code**: Exclude `.git/`, `node_modules/`, `CHROMEWEBSTORE.md` and only zip the extension directory contents.
2. [ ] **Icons**: Confirm icon files `icon16.png`, `icon48.png`, and `icon128.png` exist and are valid.
3. [ ] **Developer Account**: Log in to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole) and pay the one-time $5 developer registration fee.
4. [ ] **Screenshots**: Take at least one screenshot of the popup running in your browser, resize it to 1280x800, and upload it.
