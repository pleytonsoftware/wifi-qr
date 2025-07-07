import { jsxs, jsx } from "react/jsx-runtime";
import { Wifi } from "lucide-react";
import { useTranslation } from "react-i18next";
import { L as LOCALE_NAMESPACES, i as indexCssUrl, W as WifiCard } from "./server-build-Cp4H-4_t.js";
import "@remix-run/react";
import "react-dom/server";
import "clsx";
import "tailwind-merge";
import "react";
import "ms";
import "i18next";
import "i18next-browser-languagedetector";
import "i18next-http-backend";
import "zustand";
import "react-dom";
import "qrcode.react";
import "remix-utils/client-only";
const WifiQRCodePrinter = ({ ssid, password, dataUrl, numberOfCards = 1 }) => {
  const { t } = useTranslation(LOCALE_NAMESPACES.common);
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        "Wi-Fi QR Code - $",
        ssid
      ] }),
      /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: indexCssUrl }),
      /* @__PURE__ */ jsx("style", { children: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: white;
          }
          
          .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            position: relative;
          }

          // .icon {
          //   width: 1rem;
          //   height: 1rem;
          // }
          
          .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25in;
            justify-content: center;
          }
          
          // .wifi-card {
          //   width: 2in;
          //   height: ${password ? "2.5in" : "2in"};
          //   border-radius: 1rem;
          //   border: 2px dashed #ccc;
          //   position: relative;
          //   background: white;
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   justify-content: center;
          //   padding: 0.15in;
          //   page-break-inside: avoid;
          // }
          
          // .cut-guides {
          //   position: absolute;
          //   top: -10px;
          //   left: -10px;
          //   right: -10px;
          //   bottom: -10px;
          //   pointer-events: none;
          // }
          
          // .cut-guides::before,
          // .cut-guides::after {
          //   content: '';
          //   position: absolute;
          //   background: #999;
          // }
          
          // /* Corner cut marks */
          // .cut-guides::before {
          //   width: 15px;
          //   height: 1px;
          //   top: -1px;
          //   left: -8px;
          // }
          
          // .cut-guides::after {
          //   width: 1px;
          //   height: 15px;
          //   top: -8px;
          //   left: -1px;

          //   }

          // .cut-guides .scissors {
          //   position: absolute;
          //   top: 0;
          //   left: -2px;
          //   width: 1rem;
          //   height: 1rem;
          // }
          
          // .wifi-card::before,
          // .wifi-card::after {
          //   content: '';
          //   position: absolute;
          //   background: #999;
          // }
          
          // .wifi-card::before {
          //   width: 15px;
          //   height: 1px;
          //   top: -1px;
          //   right: -8px;
          // }
          
          // .wifi-card::after {
          //   width: 1px;
          //   height: 15px;
          //   top: -8px;
          //   right: -1px;
          // }
          
          // .card-header {
          //   text-align: center;
          //   display: flex;
          //   flex-direction: column;
          //   gap: 0.167in;
          // }

          // .card-header__name {
          //   display: flex;
          //   gap: 0.083in;
          // }
          
          // .card-header__network-name {
          //   font-size: 14px;
          //   font-weight: bold;
          //   color: #333;
          //   margin-bottom: 4px;
          //   word-break: break-all;
          //   line-height: 1.2;
          // }
          
          // .card-header__network-password {
          //   font-size: 11px;
          //   font-family: 'Courier New', monospace;
          //   color: #666;
          //   background: #f8f8f8;
          //   padding: 2px 6px;
          //   border-radius: 3px;
          //   word-break: break-all;
          //   line-height: 1.2;
          // }
          
          // .qr-section {
          //   flex: 1;
          //   display: flex;
          //   align-items: center;
          //   justify-content: center;
          // }
          
          // .qr-section__image {
          //   max-width: 1.2in;
          //   max-height: 1.2in;
          //   width: auto;
          //   height: auto;
          // }
          
          // .card-footer {
          //   text-align: center;
          //   margin-top: 4px;
          // }
          
          // .card-footer__scan-text {
          //   font-size: 8px;
          //   color: #888;
          //   line-height: 1.1;
          // }
          
          .instructions {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
            font-size: 12px;
          }
          
          .page-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
          
          @media print {
            body { 
              margin: 0; 
              padding: 0.5in;
            }
            .page {
              width: 100%;
              margin: 0;
            }
          }
          
          @page {
            margin: 0.5in;
            size: letter;
          }` })
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsxs("div", { className: "page", children: [
      /* @__PURE__ */ jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }, children: /* @__PURE__ */ jsx(Wifi, { className: "icon" }) }),
        t("wifi_config.title")
      ] }),
      /* @__PURE__ */ jsx("div", { className: "instructions", children: t("qr_code_printer.instructions") }),
      /* @__PURE__ */ jsx("div", { className: "card-container", children: Array.from({ length: numberOfCards }).map((_, idx) => /* @__PURE__ */ jsx("div", { style: { paddingTop: "0.25in" }, children: /* @__PURE__ */ jsx(WifiCard, { ssid, password, dataUrl, cutGuides: true }) }, idx)) })
    ] }) })
  ] });
};
export {
  WifiQRCodePrinter
};
