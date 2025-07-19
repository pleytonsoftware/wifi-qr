import type { Languages } from '@const/languages'

export type LayoutProps<T = object> = {
	params: Promise<{ locale: Languages }>
} & Readonly<T>
