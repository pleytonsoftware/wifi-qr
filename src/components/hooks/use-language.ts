import type { Languages } from '@const/languages'

import { useLocale } from 'next-intl'

const useLanguage = () => useLocale() as Languages

export { useLanguage }
