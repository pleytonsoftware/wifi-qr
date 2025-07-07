import 'i18next'

import type { LOCALE_NAMESPACES, Languages } from '@/constants/languages'
import type { CustomTypeOptions } from 'i18next'

declare module 'i18next' {
	// Extend CustomTypeOptions
	interface CustomTypeOptions {
		// custom namespace type, if you changed it
		defaultNS: [typeof LOCALE_NAMESPACES.languages, typeof LOCALE_NAMESPACES.common]
		// custom resources type
		resources: {
			common: typeof import('../public/locales/en/common.json')
			languages: typeof import('../public/locales/en/languages.json')
			seo: typeof import('../public/locales/en/seo.json')
		}
		// other
	}

	interface i18n {
		language: Languages
		resolvedLanguage: Languages
	}
}
