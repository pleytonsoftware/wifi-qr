import { useEffect } from 'react'

import ms from 'ms'
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'

import { COLOR_SCHEME_QUERY, DARK_MODE_COOKIE_KEY, DARK_MODE_LOCAL_STORAGE_KEY } from '@const/theme'

import { getCookie, setCookie } from '@/utils/cookie'

type DarkModeOptions = {
	defaultValue?: boolean
	localStorageKey?: string
	cookieKey?: string
	initializeWithValue?: boolean
}

type DarkModeReturn = {
	isDarkMode: boolean
	toggle: () => void
	enable: () => void
	disable: () => void
	set: (value: boolean) => void
}

const DARK_MODE_COOKIE_EXPIRATION = ms('1 year')

/**
 * An extended version of `usehooks-ts`'s `useDarkMode` hook that synchronizes the dark mode state
 * with the operating system's color scheme preference and stores the value in both localStorage
 * and cookies for SSR support.
 *
 * This hook provides a convenient API to manage dark mode state, including toggling, enabling,
 * disabling, and setting the mode directly. It persists the user's preference in localStorage
 * and cookies, and updates the state if the OS color scheme changes.
 *
 * @param options - Configuration options for the dark mode hook.
 * @returns An object containing the current dark mode state and functions to manipulate it.
 */
export function useDarkMode(options: DarkModeOptions = {}): DarkModeReturn {
	const { defaultValue, localStorageKey = DARK_MODE_LOCAL_STORAGE_KEY, cookieKey = DARK_MODE_COOKIE_KEY, initializeWithValue = true } = options

	const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
		initializeWithValue,
		defaultValue,
	})

	const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(localStorageKey, defaultValue ?? isDarkOS ?? false, { initializeWithValue })

	useEffect(() => {
		const initializeDarkMode = async () => {
			const theme = await getCookie(cookieKey)
			if (typeof theme === 'undefined') {
				setCookie(cookieKey, String(isDarkMode), {
					path: '/',
					expires: DARK_MODE_COOKIE_EXPIRATION,
				})
			}
		}

		initializeDarkMode()
	}, [])

	// Sync cookie whenever dark mode changes
	const updateTheme = (newValue: boolean) => {
		setDarkMode(newValue)
		setCookie(cookieKey, String(newValue), {
			path: '/',
			expires: DARK_MODE_COOKIE_EXPIRATION,
		})
	}

	return {
		isDarkMode,
		toggle: () => {
			updateTheme(!isDarkMode)
		},
		enable: updateTheme.bind(null, true),
		disable: updateTheme.bind(null, false),
		set: updateTheme,
	}
}

export { DARK_MODE_COOKIE_KEY }
