type UseCookieStorageOptions<T> = {
	serializer?: (value: T) => string
	deserializer?: (value: string) => T
	initializeWithValue?: boolean
	cookieOptions?: Partial<{ path: string; expires: string | number; domain: string; secure: boolean }>
}

function setCookieClassic(name: string, value: string, options: UseCookieStorageOptions<any>['cookieOptions'] = {}) {
	let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
	if (options.path) cookieStr += `;path=${options.path}`
	if (options.expires) cookieStr += `;expires=${String(options.expires)}`
	if (options.domain) cookieStr += `;domain=${options.domain}`
	if (options.secure) cookieStr += `;secure`
	document.cookie = cookieStr
}

export function setCookie(name: string, value: string, options: UseCookieStorageOptions<any>['cookieOptions'] = {}) {
	if ('cookieStore' in window && typeof window.cookieStore.set === 'function') {
		const cookieOptions: Record<string, any> = { name, value }
		if (options.path) cookieOptions.path = options.path
		if (options.domain) cookieOptions.domain = options.domain
		if (options.secure) cookieOptions.secure = options.secure
		if (options.expires) {
			if (typeof options.expires === 'number') {
				// If it's a duration, add to current time
				cookieOptions.expires = Date.now() + options.expires
			} else {
				// If it's a date string, convert to timestamp
				cookieOptions.expires = new Date(options.expires).getTime()
			}
		}
		window.cookieStore
			.set({
				name,
				value,
				...cookieOptions,
			})
			.catch(() => {
				setCookieClassic(name, value, options)
			})
	} else {
		setCookieClassic(name, value, options)
	}
}

function getCookieClassic(name: string): string | undefined {
	const match = document.cookie.match(new RegExp('(^|;)\\s*' + encodeURIComponent(name) + '=([^;]*)'))
	return match ? decodeURIComponent(match[2]) : undefined
}

export async function getCookie(name: string): Promise<string | undefined> {
	if (typeof document === 'undefined') return undefined
	if ('cookieStore' in window && typeof window.cookieStore.get === 'function') {
		try {
			const cookie = await window.cookieStore.get(name)
			return cookie?.value
		} catch {
			return getCookieClassic(name)
		}
	} else {
		return getCookieClassic(name)
	}
}
