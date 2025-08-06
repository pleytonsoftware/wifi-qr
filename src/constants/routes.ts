export const ROUTES = {
	home: '/',
	wifiCards: {
		index: '/my-beefis',
		edit: (id: string) => `/my-beefis/${id}`,
	},
} as const
