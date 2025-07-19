import type { WebApplication, WithContext } from 'schema-dts'

import { getTranslations } from 'next-intl/server'

import { LOCALE_DICTIONARY, LOCALE_NAMESPACES } from '@const/languages'

import { getAppName } from '@/utils/get-app-name'
import { getUrl } from '@/utils/get-site'

export async function getWebsiteSchema(): Promise<WithContext<WebApplication>> {
	const t = await getTranslations(LOCALE_NAMESPACES.seo)
	const baseUrl = getUrl()

	const appTitle = getAppName()

	return {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: appTitle,
		description: t('description'),
		url: baseUrl,
		applicationCategory: 'UtilityApplication',
		operatingSystem: 'All',
		author: {
			'@type': 'Person',
			name: 'Pablo Leyton',
			url: 'https://pleyt.dev',
		},
		inLanguage: (await import('@const/languages')).AVAILABLE_LANGUAGES.map((lang) => {
			return {
				'@type': 'Language',
				name: LOCALE_DICTIONARY[lang],
				alternateName: lang,
			}
		}),
	}
}
