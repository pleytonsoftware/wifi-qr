export const getUrl = () =>
	process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : undefined)
