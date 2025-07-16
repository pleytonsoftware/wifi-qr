import { getAppName } from '@/utils/get-app-name'

export enum Theme {
	light = 'light',
	dark = 'dark',
}

export const DEFAULT_THEME = Theme.light

export const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
export const DARK_MODE_LOCAL_STORAGE_KEY = `${getAppName()}-dark-mode`
export const DARK_MODE_COOKIE_KEY = 'dark-mode'
