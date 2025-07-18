export {}

declare global {
	interface Window {
		cookieStore: {
			get: (name: string) => Promise<{ name: string; value: string } | undefined>
			set: (options: Record<string, unknown>) => Promise<void>
		}
	}
}
