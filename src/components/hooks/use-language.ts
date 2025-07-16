import type { Languages } from '@/constants/languages'

import { useLocale } from 'next-intl'

const useLanguage = () => useLocale() as Languages

export { useLanguage }
