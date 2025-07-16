import type { getTranslations } from 'next-intl/server'

export const getAppName = () => process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || 'APP_NAME_NOT_SET'
export function getPageTitle(t: Awaited<ReturnType<typeof getTranslations>>) {
	const seoTitle = t('title')
	const appTitle = getAppName()
	const separator = ' | '
	const maxLength = 60

	const fullTitle = `${seoTitle}${separator}${appTitle}`

	if (fullTitle.length <= maxLength) {
		return fullTitle
	} else {
		const availableLength = maxLength - separator.length - appTitle.length
		const truncatedSeoTitle =
			availableLength > 0 ? seoTitle.substring(0, availableLength - 3) + '...' : appTitle.substring(0, maxLength - 3) + '...'
		return availableLength > 0 ? `${truncatedSeoTitle}${separator}${appTitle}` : truncatedSeoTitle
	}
}
