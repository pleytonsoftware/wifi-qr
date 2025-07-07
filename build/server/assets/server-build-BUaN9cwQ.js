import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { createContext, useRef, useState, useCallback, useEffect, useMemo, memo, useId, use } from "react";
import { X, LanguagesIcon, Wifi, Eye, EyeClosed, Scissors, Printer, QrCode, Download, Check, Copy } from "lucide-react";
import ms from "ms";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next, Translation, useTranslation, Trans } from "react-i18next";
import { create } from "zustand";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { ClientOnly } from "remix-utils/client-only";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = renderToString(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url })
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const alertColours = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error"
};
const Alert = ({ colour = "info", className, children, ...props }) => {
  const childrenNode = typeof children === "string" ? /* @__PURE__ */ jsx("span", { children }) : children;
  return /* @__PURE__ */ jsx("div", { className: cn("alert", alertColours[colour], className), ...props, children: childrenNode });
};
const Loading = ({ type = "loading-spinner", size = "md" }) => /* @__PURE__ */ jsx("span", { className: cn("loading", type, size) });
const colours$3 = {
  base: null,
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error"
};
const variants$2 = {
  default: null,
  outline: "btn-outline",
  soft: "btn-soft",
  dash: "btn-dash",
  ghost: "btn-ghost",
  link: "btn-link"
};
const sizes$3 = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: null,
  lg: "btn-lg",
  xl: "btn-xl"
};
const Button = ({
  colour = "primary",
  size = "md",
  variant = "default",
  children,
  icon,
  loading,
  className,
  as: Component = "button",
  role,
  ...props
}) => /* @__PURE__ */ jsx(
  Component,
  {
    className: cn("btn", variants$2[variant], colours$3[colour], sizes$3[size], icon && "btn-square", props.disabled && "btn-disabled", className),
    role,
    ...props,
    children: /* @__PURE__ */ jsxs(Fragment, { children: [
      loading ? /* @__PURE__ */ jsx(Loading, {}) : icon,
      children
    ] })
  }
);
const verticalPositions = {
  top: "toast-top",
  middle: "toast-middle",
  bottom: "toast-bottom"
};
const horizontalPositions = {
  start: "toast-start",
  center: "toast-center",
  end: "toast-end"
};
const Toast = ({ children, horizontal = "end", vertical = "bottom", className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("toast", verticalPositions[vertical], horizontalPositions[horizontal], className), ...props, children });
const ToastContext = createContext(void 0);
const TOAST_DEFAULT_DURATION = ms("3 seconds");
const ToastProvider = ({ defaultDuration, children, horizontalPosition, verticalPosition }) => {
  const timeoutIds = useRef([]);
  const [toasts, setToasts] = useState([]);
  const defaultDurationMs = defaultDuration ? ms(defaultDuration) : TOAST_DEFAULT_DURATION;
  const handleDismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    timeoutIds.current = timeoutIds.current.filter((tid) => tid !== id);
  }, []);
  const showToast = useCallback(
    (message) => {
      const duration = (message == null ? void 0 : message.duration) ?? defaultDurationMs;
      const timeoutId = setTimeout(() => {
        handleDismiss(toast.id);
      }, duration);
      const toast = {
        id: timeoutId,
        ...message,
        duration
      };
      setToasts((prev) => [...prev, toast]);
      timeoutIds.current.push(timeoutId);
    },
    [defaultDurationMs, handleDismiss]
  );
  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
    };
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { showToast }, children: [
    children,
    /* @__PURE__ */ jsx(Toast, { horizontal: horizontalPosition, vertical: verticalPosition, className: "z-50 pointer-events-none", children: toasts.map((toast) => /* @__PURE__ */ jsxs(Alert, { colour: toast.variant, className: "shadow-lg pointer-events-auto flex items-start gap-2 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 pr-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: toast.title }),
        toast.description && /* @__PURE__ */ jsx("p", { className: "text-sm", children: toast.description })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          "aria-label": "Dismiss",
          variant: "ghost",
          size: "xs",
          colour: toast.variant,
          className: "absolute top-1 right-1",
          onClick: () => handleDismiss(toast.id),
          icon: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "hidden" })
        }
      )
    ] }, toast.id)) })
  ] });
};
var Languages = /* @__PURE__ */ ((Languages2) => {
  Languages2["ENGLISH"] = "en";
  Languages2["SPANISH"] = "es";
  return Languages2;
})(Languages || {});
const SUPPORTED_LANGUAGES = [...Object.values(Languages)];
const DEFAULT_LANGUAGE = "en";
const I18NEXT_IDENTIFIER = "i18next";
const LOCALE_NAMESPACES = {
  common: "common",
  languages: "languages"
};
const indexCssUrl = "/assets/index-B9Kpnd9V.css";
const languageDetector = new LanguageDetector();
languageDetector.init({
  supportedLngs: SUPPORTED_LANGUAGES,
  detection: {
    order: ["querystring", "localStorage", "navigator"],
    caches: ["localStorage"],
    lookupQuerystring: "lng",
    lookupLocalStorage: I18NEXT_IDENTIFIER
  }
});
i18n.use(HttpBackend).use(languageDetector).use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  ns: [LOCALE_NAMESPACES.common, LOCALE_NAMESPACES.languages],
  debug: false,
  interpolation: { escapeValue: false },
  backend: {
    // Path where resources get loaded from
    loadPath: "/locales/{{lng}}/{{ns}}.json"
  }
});
const links = () => [
  { rel: "stylesheet", href: indexCssUrl },
  { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }
];
const meta = () => {
  return [
    { title: "WiFi QR Code Generator | Easy Wi-Fi Sharing" },
    { name: "description", content: "Generate QR codes for easy Wi-Fi sharing. Instantly create, download, print, and share QR codes that let others connect to your Wi-Fi network with a simple scan." },
    { name: "keywords", content: "wifi, qr code, generator, wireless, sharing, connection, mobile, scanner, network, password" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "theme-color", content: "#2563eb" },
    { name: "msapplication-TileColor", content: "#2563eb" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "apple-mobile-web-app-title", content: "WiFi QR Code Generator" },
    { name: "format-detection", content: "telephone=no" },
    { property: "og:title", content: "WiFi QR Code Generator | Easy Wi-Fi Sharing" },
    { property: "og:description", content: "Generate QR codes for easy Wi-Fi sharing. Instantly create, download, print, and share QR codes that let others connect to your Wi-Fi network with a simple scan." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image.jpg" },
    { property: "og:image:alt", content: "WiFi QR Code Generator Preview" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_US" },
    { property: "og:site_name", content: "WiFi QR Code Generator" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "WiFi QR Code Generator | Easy Wi-Fi Sharing" },
    { name: "twitter:description", content: "Generate QR codes for easy Wi-Fi sharing. Instantly create, download, print, and share QR codes that let others connect to your Wi-Fi network with a simple scan." },
    { name: "twitter:image", content: "/twitter-image.jpg" },
    { name: "twitter:image:alt", content: "WiFi QR Code Generator Preview" }
  ];
};
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const colourClasses$1 = {
  base: "bg-base-200",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error"
};
const sizeClasses$2 = {
  xs: "card-xs",
  sm: "card-sm",
  md: "card-md",
  lg: "card-lg",
  xl: "card-xl"
};
const Card = ({
  colour = "base",
  size = "md",
  border = false,
  dashed = false,
  containerClassName,
  children,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "card shadow-lg",
        colourClasses$1[colour],
        sizeClasses$2[size],
        border && "card-border",
        dashed && "card-dash",
        containerClassName,
        className
      ),
      ...props,
      children
    }
  );
};
const CardBody = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("card-body", className), ...props });
const CardTitle = ({ className, ...props }) => /* @__PURE__ */ jsx("h2", { className: cn("card-title", className), ...props });
const CardDescription = ({ className, ...props }) => /* @__PURE__ */ jsx("span", { className: cn("text-sm text-base-content-secondary", className), ...props });
const CardActions = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("card-actions", className), ...props });
const CardImage = ({ figureClassName, ...props }) => /* @__PURE__ */ jsx("figure", { className: cn(figureClassName), children: /* @__PURE__ */ jsx("img", { ...props }) });
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Actions = CardActions;
Card.Image = CardImage;
const colourClasses = {
  neutral: "badge-neutral",
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error"
};
const variantClasses = {
  default: null,
  soft: "badge-soft",
  outline: "badge-outline",
  dash: "badge-dash",
  ghost: "badge-ghost"
};
const sizeClasses$1 = {
  xs: "badge-xs",
  sm: "badge-sm",
  md: "badge-md",
  lg: "badge-lg",
  xl: "badge-xl"
};
const Badge = ({ colour = "primary", variant = "default", size = "md", rounded = false, children, className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "badge",
      colourClasses[colour],
      variantClasses[variant],
      sizeClasses$1[size],
      rounded && "rounded-full w-[var(--size)] h-[var(--size)]",
      className
    ),
    ...props,
    children
  }
);
const guideSteps = [
  {
    title: "steps.1.title",
    description: "steps.1.description"
  },
  {
    title: "steps.2.title",
    description: "steps.2.description"
  },
  {
    title: "steps.3.title",
    description: "steps.3.description"
  }
];
const Instructions = () => /* @__PURE__ */ jsx(Translation, { ns: "common", children: (t) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(Card.Body, { className: "space-y-2", children: [
  /* @__PURE__ */ jsx(Card.Title, { children: t("steps.title") }),
  /* @__PURE__ */ jsxs(Card.Description, { children: [
    t("steps.description"),
    ":"
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 text-sm", children: guideSteps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx(Badge, { colour: "primary", rounded: true, children: index + 1 }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-medium mb-1", children: t(step.title) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: t(step.description) })
    ] })
  ] }, index)) })
] }) }) });
const horizontalClassMap = {
  center: "dropdown-center",
  end: "dropdown-end",
  left: "dropdown-left",
  right: "dropdown-right"
};
const verticalClassMap = {
  top: "dropdown-top",
  bottom: "dropdown-bottom"
};
const modifierClassMap = {
  hover: "dropdown-hover",
  open: "dropdown-open"
};
const Dropdown = ({
  buttonContent,
  children,
  horizontal,
  vertical,
  openOn = [],
  buttonClassName,
  menuClassName,
  buttonProps,
  menuProps,
  ariaLabel = "Dropdown menu",
  className,
  ...props
}) => {
  const modifierClassNames = useMemo(() => openOn.map((m) => modifierClassMap[m]), [openOn]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "dropdown",
        horizontal && horizontalClassMap[horizontal],
        vertical && verticalClassMap[vertical],
        modifierClassNames,
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            as: "div",
            role: "button",
            type: "button",
            colour: "base",
            className: cn("m-1", buttonClassName),
            tabIndex: 0,
            "aria-label": ariaLabel,
            ...buttonProps,
            children: buttonContent
          }
        ),
        /* @__PURE__ */ jsx(
          "ul",
          {
            className: cn("dropdown-content menu shadow-sm rounded-box w-52 bg-base-300", menuClassName),
            tabIndex: 0,
            role: "menu",
            "aria-label": ariaLabel,
            ...menuProps,
            children
          }
        )
      ]
    }
  );
};
const DropdownItem = ({ children, className, selected, ...props }) => /* @__PURE__ */ jsx("li", { className: cn(selected && "bg-base-100 rounded-box", className), "aria-selected": selected, ...props, children });
Dropdown.Item = DropdownItem;
Dropdown.displayName = "Dropdown";
DropdownItem.displayName = "DropdownItem";
const LanguageSelector = () => {
  const { t, i18n: i18n2 } = useTranslation(LOCALE_NAMESPACES.languages, {
    lng: Languages.ENGLISH
  });
  const languagesNode = useMemo(
    () => SUPPORTED_LANGUAGES.map((lang) => /* @__PURE__ */ jsx(Dropdown.Item, { onClick: () => i18n2.changeLanguage(lang), selected: i18n2.resolvedLanguage === lang, children: /* @__PURE__ */ jsx("span", { children: t(`languages.${lang}`) }) }, lang)),
    [i18n2.languages]
  );
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4", children: /* @__PURE__ */ jsx(
    Dropdown,
    {
      vertical: "top",
      horizontal: "end",
      buttonClassName: "shadow-lg",
      menuClassName: "max-h-60 overflow-y-auto",
      buttonContent: /* @__PURE__ */ jsxs(Dropdown.Item, { className: "flex items-center gap-2 text-sm font-medium text-base-content", children: [
        /* @__PURE__ */ jsx(LanguagesIcon, { className: "text-secondary w-4 h-4" }),
        t(`languages.${i18n2.resolvedLanguage}`)
      ] }),
      children: languagesNode
    }
  ) });
};
const colours$2 = {
  primary: "input-primary",
  secondary: "input-secondary",
  accent: "input-accent",
  info: "input-info",
  success: "input-success",
  warning: "input-warning",
  error: "input-error"
};
const variants$1 = {
  default: null,
  ghost: "input-ghost"
};
const sizes$2 = {
  xs: "input-xs",
  sm: "input-sm",
  md: null,
  lg: "input-lg",
  xl: "input-xl"
};
const Input = ({
  colour = "primary",
  variant = "default",
  inputSize = "md",
  icon,
  label,
  rightElement,
  className,
  containerClassName,
  labelPlacement = "left",
  // default label placement
  legend: legendNode,
  Button: ButtonComponent,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  ...props
}) => {
  const labelNode = label && /* @__PURE__ */ jsx("span", { className: "label max-w-full truncate", children: label });
  const shouldRenderSimpleLabel = labelNode && !legendNode;
  let input = /* @__PURE__ */ jsxs(
    "label",
    {
      className: cn(
        "input w-full",
        ButtonComponent && "join-item",
        variants$1[variant],
        colours$2[colour],
        sizes$2[inputSize],
        containerClassName,
        props.readOnly && "!outline-none !ring-0 focus:!outline-none focus:!ring-0"
      ),
      children: [
        shouldRenderSimpleLabel && labelPlacement === "left" && labelNode,
        icon && /* @__PURE__ */ jsx("span", { className: "mr-2 flex items-center", children: icon }),
        /* @__PURE__ */ jsx("input", { className: cn("grow", className, props.readOnly && "!outline-none !ring-0 focus:!outline-none focus:!ring-0"), ...props }),
        shouldRenderSimpleLabel && labelPlacement === "right" && labelNode,
        rightElement && /* @__PURE__ */ jsx("span", { className: "ml-2 flex items-center", children: rightElement })
      ]
    }
  );
  if (legendNode) {
    input = /* @__PURE__ */ jsxs("fieldset", { className: cn("fieldset", containerClassName), children: [
      legendNode && /* @__PURE__ */ jsx("legend", { className: "fieldset-legend", children: legendNode }),
      input,
      labelNode
    ] });
  }
  if (ButtonComponent) {
    return /* @__PURE__ */ jsxs("div", { className: cn("join w-full", containerClassName), children: [
      input,
      /* @__PURE__ */ jsx(ButtonComponent, { className: cn("join-item", legendNode && "self-end mb-1", buttonClassName), ...buttonProps })
    ] });
  }
  return input;
};
const colours$1 = {
  primary: "select-primary",
  secondary: "select-secondary",
  accent: "select-accent",
  info: "select-info",
  success: "select-success",
  warning: "select-warning",
  error: "select-error"
};
const variants = {
  default: null,
  // Default variant, no specific class
  ghost: "select-ghost"
};
const sizes$1 = {
  xs: "select-xs",
  sm: "select-sm",
  md: null,
  // Default size, no specific class
  lg: "select-lg"
};
const Select = ({
  label,
  helperText,
  options,
  colour = "primary",
  variant = "default",
  selectSize = "md",
  className,
  selectClassName,
  fieldsetClassName,
  labelClassName,
  helperTextClassName,
  children,
  onValueChange,
  ...props
}) => /* @__PURE__ */ jsxs("fieldset", { className: cn("fieldset", fieldsetClassName, className), children: [
  label && /* @__PURE__ */ jsx("legend", { className: cn("fieldset-legend", labelClassName), children: label }),
  /* @__PURE__ */ jsx(
    "select",
    {
      className: cn("select w-full", colours$1[colour], variants[variant], sizes$1[selectSize], selectClassName),
      onChange: (e) => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, e);
        onValueChange == null ? void 0 : onValueChange(e.target.value);
      },
      ...props,
      children: (options == null ? void 0 : options.map((option, i) => /* @__PURE__ */ jsx(Select.Option, { ...option }, option.value ?? i))) || children
    }
  ),
  helperText && /* @__PURE__ */ jsx("span", { className: cn("label", helperTextClassName), children: helperText })
] });
Select.Option = ({ label, ...option }) => /* @__PURE__ */ jsx("option", { ...option, children: label });
Select.Option;
const colours = {
  primary: "toggle-primary",
  secondary: "toggle-secondary",
  accent: "toggle-accent",
  neutral: "toggle-neutral",
  success: "toggle-success",
  warning: "toggle-warning",
  info: "toggle-info",
  error: "toggle-error"
};
const sizes = {
  xs: "toggle-xs",
  sm: "toggle-sm",
  md: "toggle-md",
  lg: "toggle-lg",
  xl: "toggle-xl"
};
const Toggle = ({
  colour = "primary",
  size = "md",
  label,
  className,
  labelClassName,
  containerClassName,
  onValueChange,
  ...props
}) => /* @__PURE__ */ jsxs("label", { className: cn("inline-flex items-center gap-2", containerClassName), children: [
  /* @__PURE__ */ jsx(
    "input",
    {
      type: "checkbox",
      className: cn("toggle", colours[colour], sizes[size], className, props.disabled && "toggle-disabled"),
      onChange: (e) => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, e);
        onValueChange == null ? void 0 : onValueChange(e.target.checked);
      },
      ...props
    }
  ),
  label && /* @__PURE__ */ jsx("span", { className: cn("select-none", labelClassName), children: label })
] });
var SecurityType = /* @__PURE__ */ ((SecurityType2) => {
  SecurityType2["WPA"] = "WPA";
  SecurityType2["WEP"] = "WEP";
  SecurityType2["NO_PASS"] = "nopass";
  return SecurityType2;
})(SecurityType || {});
const pickLabel = { label: "Select security type", disabled: true, value: "pick" };
const securityOptions = [
  { value: "WPA", label: "WPA/WPA2/WPA3" },
  { value: "WEP", label: "WEP" },
  { value: "nopass", label: "No Password" }
];
const securityOptionsWithPick = [pickLabel, ...securityOptions];
const DEFAULT_SECURITY_TYPE = "WPA";
const getWiFiString = ({ ssid, password, securityType, hiddenNetwork }) => {
  if (securityType === SecurityType.NO_PASS || !securityType) {
    return `WIFI:T:nopass;S:${ssid};H:${hiddenNetwork};;`;
  }
  return `WIFI:T:${securityType};S:${ssid};P:${password};H:${hiddenNetwork};;`;
};
const initialWifiDetails = {
  ssid: "",
  password: "",
  securityType: DEFAULT_SECURITY_TYPE,
  hiddenNetwork: false
};
const useWiFiQRStore = create((set) => ({
  wifiDetails: initialWifiDetails,
  wifiString: getWiFiString(initialWifiDetails),
  wifiDataUrl: void 0,
  setWifiDetails: ({ ssid, password, securityType, hiddenNetwork }) => set(({ wifiDetails }) => {
    const updatedDetails = {
      ssid: ssid ?? wifiDetails.ssid,
      password: password ?? wifiDetails.password,
      securityType: securityType ?? wifiDetails.securityType,
      hiddenNetwork: hiddenNetwork ?? wifiDetails.hiddenNetwork
    };
    return {
      wifiDetails: updatedDetails,
      wifiString: getWiFiString(updatedDetails),
      wifiDataUrl: void 0
    };
  }),
  setWifiDataUrl: (dataUrl) => set(() => ({
    wifiDataUrl: dataUrl
  }))
}));
const WiFiConfigForm = memo(() => {
  const { t } = useTranslation(LOCALE_NAMESPACES.common);
  const [showPassword, setShowPassword] = useState(false);
  const {
    wifiDetails: { ssid, password, securityType, hiddenNetwork },
    setWifiDetails
  } = useWiFiQRStore();
  const ShowPasswordIcon = showPassword ? Eye : EyeClosed;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        legend: t("wifi_config.fields.network_name.label"),
        id: "ssid",
        placeholder: t("wifi_config.fields.network_name.placeholder"),
        value: ssid,
        icon: /* @__PURE__ */ jsx(Wifi, { className: "h-4 w-4" }),
        onChange: (e) => setWifiDetails({
          ssid: e.target.value
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(
      Select,
      {
        label: t("wifi_config.fields.security_type.label"),
        defaultValue: DEFAULT_SECURITY_TYPE,
        onValueChange: (securityType2) => setWifiDetails({ securityType: securityType2 }),
        options: securityOptionsWithPick.map((option) => ({
          ...option,
          label: t(`wifi_config.fields.security_type.options.${option.value}`)
        }))
      }
    ) }),
    securityType !== SecurityType.NO_PASS && /* @__PURE__ */ jsx(
      Input,
      {
        legend: t("wifi_config.fields.password.label"),
        id: "password",
        type: showPassword ? "text" : "password",
        placeholder: t("wifi_config.fields.password.placeholder"),
        value: password,
        onChange: (e) => setWifiDetails({ password: e.target.value }),
        containerClassName: "w-full",
        Button,
        buttonProps: {
          icon: /* @__PURE__ */ jsx(ShowPasswordIcon, { className: "w-4 h-4" }),
          onClick: setShowPassword.bind(null, (prev) => !prev),
          colour: "base",
          variant: "ghost"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      Toggle,
      {
        label: t("wifi_config.fields.hidden_network.label"),
        defaultChecked: hiddenNetwork,
        onValueChange: (hiddenNetwork2) => setWifiDetails({
          hiddenNetwork: hiddenNetwork2
        })
      }
    )
  ] });
});
const sizeClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl"
};
const positionClasses = {
  center: "modal",
  bottom: "modal modal-bottom sm:modal-middle"
};
const Modal = ({
  open,
  onClose,
  children,
  size = "md",
  position = "center",
  showCloseButton = false,
  closeOnBackdrop = true,
  closeOnEsc = true,
  containerClassName,
  boxClassName,
  usePortal = true,
  ...props
}) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog2 = dialogRef.current;
    if (!dialog2) return;
    if (open && !dialog2.open) dialog2.showModal();
    if (!open && dialog2.open) dialog2.close();
  }, [open]);
  useEffect(() => {
    if (!closeOnEsc) return;
    const handler = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, onClose]);
  const handleBackdropClick = (e) => {
    if (!closeOnBackdrop) return;
    if (e.target === dialogRef.current) onClose();
  };
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const portalTarget = typeof window !== "undefined" ? document.body : null;
  const dialog = /* @__PURE__ */ jsx(
    "dialog",
    {
      ref: dialogRef,
      className: cn(positionClasses[position], containerClassName),
      onClick: handleBackdropClick,
      onClose,
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: cn("modal-box", sizeClasses[size], boxClassName), children: [
        showCloseButton && /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            "aria-label": "Close",
            size: "sm",
            variant: "ghost",
            className: cn("absolute right-2 top-2"),
            onClick: onClose,
            icon: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        ),
        children
      ] })
    }
  );
  if (usePortal) {
    if (!portalTarget) return null;
    return createPortal(dialog, portalTarget);
  }
  return dialog;
};
const WifiCard = memo(
  ({ ssid, password, dataUrl, cutGuides }) => {
    const { t, i18n: i18n2 } = useTranslation(LOCALE_NAMESPACES.common);
    return /* @__PURE__ */ jsxs("div", { className: cn("wifi-card", cutGuides && "cut-outline", ssid && password && "has-password"), children: [
      cutGuides && /* @__PURE__ */ jsx("div", { className: "cut-guides", children: /* @__PURE__ */ jsx(Scissors, { className: "scissors" }) }),
      (ssid || password) && /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
        ssid && /* @__PURE__ */ jsxs("div", { className: "card-header__name", children: [
          /* @__PURE__ */ jsx(Wifi, { className: "card-header__icon", style: { display: "inline" } }),
          /* @__PURE__ */ jsx("div", { className: "card-header__network-name", children: ssid })
        ] }),
        password && /* @__PURE__ */ jsx("div", { className: "card-header__network-password", children: password })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "qr-section", children: dataUrl && /* @__PURE__ */ jsx("img", { src: dataUrl, alt: "Wi-Fi QR Code", className: "qr-section__image" }) }),
      /* @__PURE__ */ jsxs("div", { className: "card-footer", children: [
        /* @__PURE__ */ jsx("div", { className: "card-footer__scan-text", children: t("qr_code_printer.scan") }),
        i18n2.resolvedLanguage !== DEFAULT_LANGUAGE && /* @__PURE__ */ jsx("div", { className: "card-footer__scan-text smaller", children: t("qr_code_printer.scan", {
          lng: DEFAULT_LANGUAGE
        }) })
      ] })
    ] });
  },
  (prevProps, nextProps) => prevProps.ssid === nextProps.ssid && prevProps.password === nextProps.password && prevProps.dataUrl === nextProps.dataUrl && prevProps.cutGuides === nextProps.cutGuides
);
const NUMBER_CARDS_LIMITS = { min: 1, max: 100 };
const PrintSettingsModal = ({
  open,
  onClose,
  numberOfCards,
  printWithSSID,
  printWithPassword,
  onValueChange,
  onPrint
}) => {
  const idPrefix = useId();
  const { t } = useTranslation(LOCALE_NAMESPACES.common);
  const wifiDataUrl = useWiFiQRStore((state) => state.wifiDataUrl);
  const wifiDetails = useWiFiQRStore((state) => state.wifiDetails);
  return /* @__PURE__ */ jsx(Modal, { open, onClose, size: "xl", position: "center", showCloseButton: true, closeOnBackdrop: true, closeOnEsc: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse lg:flex-row w-full space-x-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: t("print_setup.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-base-content-secondary", children: t("print_setup.description") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(
          Input,
          {
            id: `${idPrefix}-card-count`,
            type: "number",
            legend: t("print_setup.number_of_cards.legend"),
            min: NUMBER_CARDS_LIMITS.min,
            max: NUMBER_CARDS_LIMITS.max,
            value: numberOfCards,
            onChange: (e) => {
              const value = Math.max(
                NUMBER_CARDS_LIMITS.min,
                Math.min(NUMBER_CARDS_LIMITS.max, Number.parseInt(e.target.value) || NUMBER_CARDS_LIMITS.min)
              );
              onValueChange == null ? void 0 : onValueChange("numberOfCards", value);
            },
            className: "w-full",
            label: t("print_setup.number_of_cards.label", { min: NUMBER_CARDS_LIMITS.min, max: NUMBER_CARDS_LIMITS.max })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: t("print_setup.card_content.title") }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
            Toggle,
            {
              label: t("print_setup.card_content.display_ssid"),
              id: `${idPrefix}-print-ssid`,
              checked: printWithSSID,
              onValueChange: (printWithSSID2) => onValueChange == null ? void 0 : onValueChange("printWithSSID", printWithSSID2)
            }
          ) }),
          wifiDetails.securityType !== "nopass" && /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
            Toggle,
            {
              label: t("print_setup.card_content.display_password"),
              id: `${idPrefix}-print-password`,
              checked: printWithPassword,
              onValueChange: (printWithPassword2) => onValueChange == null ? void 0 : onValueChange("printWithPassword", printWithPassword2)
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-between mt-6", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: onClose, children: t("buttons.cancel") }),
        /* @__PURE__ */ jsxs(Button, { onClick: onPrint, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }),
          t("buttons.print_cards", { count: numberOfCards })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col mx-auto items-center justify-center w-64 p-4 lg:border-l lg:border-base-300", children: /* @__PURE__ */ jsx(
      WifiCard,
      {
        ssid: printWithSSID ? wifiDetails.ssid : void 0,
        password: printWithPassword ? wifiDetails.password : void 0,
        dataUrl: wifiDataUrl || ""
      }
    ) })
  ] }) });
};
const CLOSE_PRINT_TIMEOUT_MS = ms("0.5 seconds");
const WiFiQRCodeDisplay = memo(() => {
  const { t } = useTranslation(LOCALE_NAMESPACES.common);
  const [open, setOpen] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(1);
  const [printWithSSID, setPrintWithSSID] = useState(true);
  const [printWithPassword, setPrintWithPassword] = useState(false);
  const { ssid, password, securityType } = useWiFiQRStore((state) => state.wifiDetails);
  const wifiString = useWiFiQRStore((state) => state.wifiString);
  const wifiDataUrl = useWiFiQRStore((state) => state.wifiDataUrl);
  const setWifiDataUrl = useWiFiQRStore((state) => state.setWifiDataUrl);
  const qrRef = useRef(null);
  const isReadyQR = Boolean(ssid.trim()) && (securityType === SecurityType.NO_PASS || (securityType === SecurityType.WPA || securityType === SecurityType.WEP) && Boolean(password.trim()));
  const generateAndSetWifiDataUrl = useCallback(async () => {
    if (!(qrRef == null ? void 0 : qrRef.current)) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(qrRef.current);
    setWifiDataUrl(dataUrl);
    return dataUrl;
  }, [qrRef, setWifiDataUrl]);
  const handleDownload = useCallback(async () => {
    const dataUrl = await generateAndSetWifiDataUrl();
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${ssid}_wifi_qr.png`;
    link.click();
  }, [ssid]);
  const handlePrintOpen = useCallback(async () => {
    await generateAndSetWifiDataUrl();
    setOpen(true);
  }, []);
  const handlePrint = useCallback(async () => {
    if (!wifiDataUrl) return;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const [{ renderToStaticMarkup }, { WifiQRCodePrinter }] = await Promise.all([
        import("react-dom/server"),
        import("./index-CWJdc33m.js")
      ]);
      const ssidToDisplay = printWithSSID ? ssid : void 0;
      const password2 = printWithPassword ? useWiFiQRStore.getState().wifiDetails.password : void 0;
      const html = renderToStaticMarkup(
        /* @__PURE__ */ jsx(WifiQRCodePrinter, { ssid: ssidToDisplay, password: password2, dataUrl: wifiDataUrl, numberOfCards })
      );
      printWindow.document.writeln(html);
      printWindow.document.close();
      printWindow.focus();
      setOpen(false);
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, CLOSE_PRINT_TIMEOUT_MS);
    }
  }, [printWithSSID, ssid, printWithPassword, numberOfCards, wifiDataUrl]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full justify-around flex flex-col items-center self-center space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: cn("bg-white p-4 rounded-lg shadow-sm border aspect-square w-48 h-48"), children: isReadyQR ? /* @__PURE__ */ jsxs("div", { className: "relative inline-block w-full h-full", ref: qrRef, children: [
      /* @__PURE__ */ jsx(QRCodeSVG, { value: wifiString, level: "H", className: "w-full h-full" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary bg-white rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Wifi, {}) })
    ] }) : /* @__PURE__ */ jsx(QrCode, { className: "text-black w-full h-full" }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 justify-self-end min-h-12", children: isReadyQR ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-col lg:flex-row items-center justify-around", children: [
      /* @__PURE__ */ jsxs(Button, { colour: "primary", onClick: handleDownload, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
        t("qr_display.buttons.download")
      ] }),
      /* @__PURE__ */ jsxs(Button, { colour: "primary", variant: "outline", onClick: handlePrintOpen, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }),
        t("qr_display.buttons.print")
      ] }),
      /* @__PURE__ */ jsx(
        PrintSettingsModal,
        {
          open,
          onClose: () => setOpen(false),
          onPrint: handlePrint,
          numberOfCards,
          printWithSSID,
          printWithPassword,
          onValueChange: (key, value) => {
            if (key === "numberOfCards") {
              setNumberOfCards(value);
            } else if (key === "printWithSSID") {
              setPrintWithSSID(value);
            } else if (key === "printWithPassword") {
              setPrintWithPassword(value);
            }
          }
        }
      )
    ] }) }) : /* @__PURE__ */ jsxs("p", { className: "text-sm text-base-content-secondary text-center", children: [
      t("qr_display.messages.enter_details"),
      /* @__PURE__ */ jsx("br", {}),
      t("qr_display.messages.ensure_requirements")
    ] }) })
  ] });
});
const useToast = () => {
  const ctx = use(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
const WiFiStringCopy = memo(() => {
  const { t, i18n: i18n2 } = useTranslation(LOCALE_NAMESPACES.common);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const wifiString = useWiFiQRStore((state) => state.wifiString);
  const copyWiFiString = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wifiString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
      showToast({
        title: t("wifi_string_copy.toast.copied.title"),
        description: t("wifi_string_copy.toast.copied.description"),
        variant: "success"
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      showToast({
        title: t("wifi_string_copy.toast.copy_failed.title"),
        description: t("wifi_string_copy.toast.copy_failed.description"),
        variant: "error"
      });
    }
  }, [wifiString, showToast, i18n2.resolvedLanguage]);
  return /* @__PURE__ */ jsx(
    Input,
    {
      readOnly: true,
      value: /^(.*P:)(.*?)(;.*)$/.test(wifiString) && RegExp.$2 ? wifiString.replace(/(P:)(.*?)(;)/, (_, p1, _p2, p3) => p1 + "****" + p3) : wifiString,
      className: "font-mono text-xs",
      Button,
      buttonProps: {
        icon: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
        onClick: copyWiFiString
      }
    }
  );
});
const WiFiQRGenerator = () => {
  const { t } = useTranslation(LOCALE_NAMESPACES.common);
  const yearRef = useRef((/* @__PURE__ */ new Date()).getFullYear());
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh bg-base-100 bg-gradient-to-br from-base-100 to-primary/10 relative", children: [
    /* @__PURE__ */ jsx("div", { className: "min-h-dvh flex flex-col justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto flex flex-col space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Wifi, { className: "h-8 w-8 text-primary" }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-base-content", children: t("app.title") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base-content-secondary", children: t("app.subtitle") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(Card.Body, { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Card.Title, { children: t("wifi_config.title") }),
          /* @__PURE__ */ jsx(Card.Description, { children: t("wifi_config.description") }),
          /* @__PURE__ */ jsx(WiFiConfigForm, {}),
          /* @__PURE__ */ jsx("div", { className: "pt-4 space-y-2", children: /* @__PURE__ */ jsx(WiFiStringCopy, {}) })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(Card.Body, { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Card.Title, { children: t("generated_qr.title") }),
          /* @__PURE__ */ jsx(Card.Description, { children: t("generated_qr.description") }),
          /* @__PURE__ */ jsx(WiFiQRCodeDisplay, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Instructions, {}),
      /* @__PURE__ */ jsx(LanguageSelector, {})
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "mt-8 text-center py-6 border-t border-base-200 bg-transparent", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-base-content-secondary", children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { ns: LOCALE_NAMESPACES.common, i18nKey: "footer.created_by", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://pleyt.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "btn btn-link btn-xs font-medium text-base-content"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1", children: [
        t("app.title"),
        " ",
        t("footer.copyright", { year: yearRef.current })
      ] })
    ] }) })
  ] });
};
function Index() {
  return /* @__PURE__ */ jsx(ClientOnly, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: () => /* @__PURE__ */ jsx(WiFiQRGenerator, {}) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BS2FxHuK.js", "imports": ["/assets/index-CVIBN00R.js", "/assets/components-D00BnnB_.js"], "css": ["/assets/entry-3ZBxP9fz.css"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DHNVrWyL.js", "imports": ["/assets/index-CVIBN00R.js", "/assets/components-D00BnnB_.js", "/assets/i18nInstance-D_8jZpn5.js", "/assets/index-C-sdVn0z.js"], "css": ["/assets/entry-3ZBxP9fz.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BX3fwkxE.js", "imports": ["/assets/_index-Cz-au2w8.js", "/assets/index-CVIBN00R.js", "/assets/i18nInstance-D_8jZpn5.js"], "css": [] } }, "url": "/assets/manifest-51b58e32.js", "version": "51b58e32" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  LOCALE_NAMESPACES as L,
  WifiCard as W,
  assetsBuildDirectory as a,
  basename as b,
  isSpaMode as c,
  entry as e,
  future as f,
  indexCssUrl as i,
  mode as m,
  publicPath as p,
  routes as r,
  serverManifest as s
};
