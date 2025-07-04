export enum Languages {
	ENGLISH = 'en', // English
	SPANISH = 'es', // Spanish
}

export enum DisabledLanguages {
	GERMAN = 'de', // German
	FRENCH = 'fr', // French
	ITALIAN = 'it', // Italian
	PORTUGUESE = 'pt', // Portuguese
	DUTCH = 'nl', // Dutch
	POLISH = 'pl', // Polish
	RUSSIAN = 'ru', // Russian
	CHINESE = 'zh', // Chinese
	JAPANESE = 'ja', // Japanese
	KOREAN = 'ko', // Korean
	ARABIC = 'ar', // Arabic
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

export const SUPPORTED_LANGUAGES = [...Object.values(Languages)] as const
export const DEFAULT_LANGUAGE = Languages.ENGLISH

export const LOCALE_NAMESPACES = {
	common: 'common',
	languages: 'languages',
} as const
