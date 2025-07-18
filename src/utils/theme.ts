import { cookies } from 'next/headers'

import { DARK_MODE_COOKIE_KEY, DEFAULT_THEME, Theme } from '@const/theme'

export async function getServerSideTheme() {
	const cookieStore = await cookies()
	const theme = cookieStore.get(DARK_MODE_COOKIE_KEY)

	const themeValue = typeof theme === 'undefined' ? DEFAULT_THEME : theme?.value === 'true' ? Theme.dark : Theme.light

	return {
		theme: themeValue,
		themeDataAttributes: {
			['data-theme']: themeValue,
		},
	}
}
