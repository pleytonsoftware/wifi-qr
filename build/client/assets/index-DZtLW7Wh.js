import{j as e}from"./index-CVIBN00R.js";import{L as s}from"./i18nInstance-D_8jZpn5.js";import{i as d}from"./index-C-sdVn0z.js";import{u as c,W as p,a as l}from"./_index-Cz-au2w8.js";const u=({ssid:i,password:t,dataUrl:n,numberOfCards:o=1})=>{const{t:r}=c(s.common);return e.jsxs("html",{children:[e.jsxs("head",{children:[e.jsxs("title",{children:["Wi-Fi QR Code - $",i]}),e.jsx("link",{rel:"stylesheet",href:d}),e.jsx("style",{children:`
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
          //   height: ${t?"2.5in":"2in"};
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
          }`})]}),e.jsx("body",{children:e.jsxs("div",{className:"page",children:[e.jsxs("div",{className:"page-title",children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"1rem"},children:e.jsx(p,{className:"icon"})}),r("wifi_config.title")]}),e.jsx("div",{className:"instructions",children:r("qr_code_printer.instructions")}),e.jsx("div",{className:"card-container",children:Array.from({length:o}).map((x,a)=>e.jsx("div",{style:{paddingTop:"0.25in"},children:e.jsx(l,{ssid:i,password:t,dataUrl:n,cutGuides:!0})},a))})]})})]})};export{u as WifiQRCodePrinter};
