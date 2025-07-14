import { useLocalStorage, useMediaQuery } from 'usehooks-ts'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const DARK_MODE_LOCAL_STORAGE_KEY = 'wifi-qr-dark-mode'

type DarkModeOptions = {
	defaultValue?: boolean
	localStorageKey?: string
	initializeWithValue?: boolean
}

type DarkModeReturn = {
	isDarkMode: boolean
	toggle: () => void
	enable: () => void
	disable: () => void
	set: (value: boolean) => void
}

/**
 * An extended version of `usehooks-ts`'s `useDarkMode` hook that synchronizes the dark mode state
 * with the operating system's color scheme preference, fixing the issue described in:
 * https://github.com/juliencrn/usehooks-ts/issues/512#issuecomment-2467375000
 *
 * This hook provides a convenient API to manage dark mode state, including toggling, enabling,
 * disabling, and setting the mode directly. It also persists the user's preference in localStorage
 * and updates the state if the OS color scheme changes.
 *
 * @param options - Configuration options for the dark mode hook.
 * @returns An object containing the current dark mode state and functions to manipulate it.
 */
export function useDarkMode(options: DarkModeOptions = {}): DarkModeReturn {
	const { defaultValue, localStorageKey = DARK_MODE_LOCAL_STORAGE_KEY, initializeWithValue = true } = options

	const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
		initializeWithValue,
		defaultValue,
	})
	const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(localStorageKey, defaultValue ?? isDarkOS ?? false, { initializeWithValue })

	return {
		isDarkMode,
		toggle: () => {
			setDarkMode((prev) => !prev)
		},
		enable: () => {
			setDarkMode(true)
		},
		disable: () => {
			setDarkMode(false)
		},
		set: (value) => {
			setDarkMode(value)
		},
	}
}
