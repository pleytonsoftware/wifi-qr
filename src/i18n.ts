import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LANGUAGE, LOCALE_NAMESPACES, SUPPORTED_LANGUAGES } from './constants/languages'

const languageDetector = new LanguageDetector()
languageDetector.init({
	supportedLngs: SUPPORTED_LANGUAGES,
	detection: {
		order: ['querystring', 'cookie', 'localStorage', 'navigator'],
		caches: ['localStorage', 'cookie'],
		lookupQuerystring: 'lng',
	},
})

i18n.use(HttpBackend)
	.use(languageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: DEFAULT_LANGUAGE,
		ns: [LOCALE_NAMESPACES.common, LOCALE_NAMESPACES.languages],
		debug: import.meta.env.DEV,
		interpolation: { escapeValue: false },
		backend: {
			// Path where resources get loaded from
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
	})

export default i18n
