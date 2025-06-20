# WiFi QR Code Generator

Generate QR codes for easy Wi-Fi sharing. Instantly create, download, print, and share QR codes that let others connect to your Wi-Fi network with a simple scan.

## Features

- Enter Wi-Fi SSID, security type, and password
- Live QR code generation as you type
- Download or print the QR code
- Copy the Wi-Fi string for manual use
- Responsive, modern UI with [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com/), and [DaisyUI](https://daisyui.com/)

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

Open [http://localhost:5173](http://localhost:5173) in your browser.

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
- `src/index.css` – Custom themes and Tailwind setup

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS** + DaisyUI
- **Prettier** (with Tailwind and import sorting plugins)
- **ESLint**
- **zustand** (state management)
- **qrcode.react** (QR code rendering)
- **html-to-image** (QR code download/print)

## License

MIT

---

Created by [pleyt.dev](https://pleyt.dev)
