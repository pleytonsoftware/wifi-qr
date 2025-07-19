export enum Languages {
	ENGLISH = 'en', // English
	SPANISH = 'es', // Spanish
	GERMAN = 'de', // German
	FRENCH = 'fr', // French
	ITALIAN = 'it', // Italian
	PORTUGUESE = 'pt', // Portuguese
	CATALAN = 'ca', // Catalan
	BASQUE = 'eu', // Basque
	GALICIAN = 'gl', // Galician
	ARABIC = 'ar', // Arabic
}

export enum DisabledLanguages {
	DUTCH = 'nl', // Dutch
	POLISH = 'pl', // Polish
	RUSSIAN = 'ru', // Russian
	CHINESE = 'zh', // Chinese
	JAPANESE = 'ja', // Japanese
	KOREAN = 'ko', // Korean
	HINDI = 'hi', // Hindi
	TURKISH = 'tr', // Turkish
	VIETNAMESE = 'vi', // Vietnamese
	INDONESIAN = 'id', // Indonesian
	THAI = 'th', // Thai
	MALAY = 'ms', // Malay
	CZECH = 'cs', // Czech
	HUNGARIAN = 'hu', // Hungarian
	ROMANIAN = 'ro', // Romanian
	SLOVAK = 'sk', // Slovak
	BULGARIAN = 'bg', // Bulgarian
	CROATIAN = 'hr', // Croatian
	SERBIAN = 'sr', // Serbian
	UKRAINIAN = 'uk', // Ukrainian
	GREEK = 'el', // Greek
	FINNISH = 'fi', // Finnish
	NORWEGIAN = 'no', // Norwegian
	DANISH = 'da', // Danish
	SWEDISH = 'sv', // Swedish
	LITHUANIAN = 'lt', // Lithuanian
	SLOVENIAN = 'sl', // Slovenian
	ESTONIAN = 'et', // Estonian
	LATVIAN = 'lv', // Latvian
	HEBREW = 'he', // Hebrew
}

export const AVAILABLE_LANGUAGES = [...Object.values(Languages)] as const
export const DEFAULT_LANGUAGE = Languages.ENGLISH
export const I18NEXT_IDENTIFIER = 'i18next'
export const RTL_LANGUAGES = [Languages.ARABIC, DisabledLanguages.HEBREW] as const

export const LOCALE_NAMESPACES = {
	common: 'common',
	seo: 'seo',
} as const

type LANGUAGE_CODES = `${Languages}` | `${DisabledLanguages}`
export const LOCALE_DICTIONARY: Record<LANGUAGE_CODES, string> = {
	en: 'English',
	de: 'Deutsch',
	fr: 'Français',
	es: 'Español',
	it: 'Italiano',
	pt: 'Português',
	nl: 'Nederlands',
	pl: 'Polski',
	ru: 'Русский',
	zh: '中文',
	ja: '日本語',
	ko: '한국어',
	ar: 'العربية',
	hi: 'हिन्दी',
	tr: 'Türkçe',
	vi: 'Tiếng Việt',
	id: 'Bahasa Indonesia',
	th: 'ไทย',
	ms: 'Bahasa Melayu',
	cs: 'Čeština',
	hu: 'Magyar',
	ro: 'Română',
	sk: 'Slovenčina',
	bg: 'Български',
	hr: 'Hrvatski',
	sr: 'Српски',
	uk: 'Українська',
	el: 'Ελληνικά',
	fi: 'Suomi',
	no: 'Norsk',
	da: 'Dansk',
	sv: 'Svenska',
	lt: 'Lietuvių',
	sl: 'Slovenščina',
	et: 'Eesti',
	lv: 'Latviešu',
	he: 'עברית',
	ca: 'Català',
	eu: 'Euskara',
	gl: 'Galego',
} // as const
