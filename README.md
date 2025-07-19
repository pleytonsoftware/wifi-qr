# WiFi QR Code Generator

Generate QR codes for easy Wi-Fi sharing. Instantly create, download, print, and share QR codes that let others connect to your Wi-Fi network with a simple scan.

## Features

- Enter Wi-Fi SSID, security type, and password
- Live QR code generation as you type
- Download or print the QR code
- Copy the Wi-Fi string for manual use
- Responsive, modern UI with [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com/), and [DaisyUI](https://daisyui.com/)

## Planned Features

### 🎯 Near-term Features

- [x] **Dark/Light Theme**: User preference theme switching
- [x] **Form Validation & Clear Button**: Add input validation with error messages and a clear button to reset all fields
- [ ] **Multi-language Support**: Expand beyond current i18n setup (more languages) and add flag icons
- [ ] **Save WiFi Cards**: Store your frequently used WiFi networks locally (localStorage)
- [ ] **Color Palette**: Customize WiFi card colors and themes for better organization
- [ ] **Multi-step form**: Break the WiFi card creation process into multiple steps for a cleaner, guided user experience (e.g., Step 1: Network details, Step 2: Security, Step 3: Customize & Generate)
- [ ] **Google OAuth**: Sync your saved WiFi cards across devices with Google authentication

### 🚀 Future Enhancements

- **Bulk QR Generation**: Generate multiple QR codes at once from a CSV/JSON file
- **Export Options**:
    - Export as PDF with multiple cards per page
    - Export as SVG for vector graphics
    - Bulk export all saved networks

- **Network Categories**: Organize saved networks by location (Home, Office, Coffee Shop, etc.)
- **Offline PWA**: Full offline functionality as a Progressive Web App
- **Template System**: Pre-designed card templates for different use cases ⁉️
  What it is: Pre-designed card templates for different use cases (home, office, coffee shop, events, etc.).

    Why it's complex:

    Design Challenge: What makes a "template" different from just color themes?
    Implementation Options:
    Visual templates: Different layouts, fonts, and styling for the cards
    Functional templates: Pre-filled security settings, naming conventions, categories
    Contextual templates: Different information displayed based on use case (guest networks might show duration, office networks might show contact info)

- **Password Generator**: Built-in secure password generator for new networks
- **Accessibility Features**: Enhanced screen reader support and keyboard navigation
- **Mobile Optimizations**: Better mobile UX with camera scanning preview ⁉️
  What it is: Better mobile UX with camera scanning preview - showing users how their QR code will look when scanned.

    Why it's complex:

    Technical Challenge: Requires camera API access and QR code scanning capabilities
    Implementation Options:
    Preview mode: Show how the QR looks through a camera viewfinder
    Test scanning: Actually scan the generated QR code to verify it works
    Responsive improvements: Better touch interfaces and mobile-first design
    Considerations:

    Camera API permissions can be intrusive for a simple QR generator
    Different from core functionality - might be feature creep
    Could be very valuable for ensuring QR codes are properly sized and readable
    Might be better as a separate "test" feature rather than always-on preview

- **Backup/Restore**: Export/import all saved networks as encrypted files ⁉️
  What it is: Export/import all saved networks as encrypted files for backup and device migration.

    Why it's complex:

    Security Challenge: How to handle encryption keys and user passwords securely
    Implementation Options:
    Client-side encryption: User provides a master password for backup encryption
    Unencrypted export: User responsible for file security (simpler but less secure)
    Cloud integration: Tie into Google OAuth for encrypted cloud backups
    Considerations:

    Storing WiFi passwords is sensitive - encryption is almost mandatory
    Key management is complex (what if user forgets master password?)
    Could be overkill if Google OAuth sync is already implemented
    Export format needs to be future-proof and potentially cross-compatible

### ❌ Discarded Features

- **Guest Network Mode**: Quick toggle for guest networks with expiration dates
  What it is: A quick toggle/mode for generating QR codes specifically for guest networks with automatic expiration dates.

    Why it's complex:

    Technical Challenge: WiFi QR codes themselves don't support expiration - they're just static connection strings
    Implementation Options:
    UI-only solution: Just a template/reminder system that helps users remember to change guest passwords
    Router integration: Connect to router APIs to automatically disable guest networks after expiration
    Hybrid approach: Generate time-limited passwords and remind users to update them

- **QR Code Analytics**: Track when and how often QR codes are scanned (privacy-focused)
- **Network Validation**: Test network connectivity before generating QR codes
- **Integration APIs**: Connect with router APIs to auto-populate network details

## Demo

Visit: [wifiqr.plet.dev](https://wifiqr.plet.dev)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## Project Structure

- `src/components/ui/organism/wifi-qr-generator/` – Main generator UI
- `src/components/ui/molecules/` – Reusable UI components (QR display, instructions, etc.)
- `src/app/globals.css` – Custom themes and Tailwind setup

## Tech Stack

- **React 19**
- **Next.js 15**
- **Tailwind CSS** + DaisyUI
- **Prettier** (with Tailwind and import sorting plugins)
- **ESLint**
- **zustand** (state management)
- **qrcode.react** (QR code rendering)
- **html-to-image** (QR code download/print)
- **next-intl** (i18n)

## License

MIT

---

Created by [pleyt.dev](https://pleyt.dev)
