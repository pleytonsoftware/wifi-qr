export type LayoutProps<T = {}> = {
	params: Promise<{ locale: string }>
} & Readonly<T>
