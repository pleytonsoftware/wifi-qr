import { defineRouting } from 'next-intl/routing'

import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from '@/constants/languages'

export const routing = defineRouting({
	locales: AVAILABLE_LANGUAGES,
	defaultLocale: DEFAULT_LANGUAGE,
})
