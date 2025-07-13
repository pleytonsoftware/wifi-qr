export const getUrl = () => import.meta.env.VITE_BASE_HOST || `${window.location.protocol}//${window.location.host}`
