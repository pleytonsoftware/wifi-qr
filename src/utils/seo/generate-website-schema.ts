import type { WebApplication, WithContext } from 'schema-dts'

import { getTranslations } from 'next-intl/server'

import { LOCALE_NAMESPACES } from '@/constants/languages'

import { getAppName } from '../get-app-name'
import { getUrl } from '../get-site'

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
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		author: {
			'@type': 'Person',
			name: 'Pablo Leyton',
			url: 'https://pleyt.dev',
		},
		inLanguage: [
			{ '@type': 'Language', name: 'English', alternateName: 'en' },
			{ '@type': 'Language', name: 'Spanish', alternateName: 'es' },
		],
		featureList: [
			'Generate WiFi QR codes',
			'Secure password handling',
			'Multiple WiFi security types support',
			'Instant QR code generation',
			'Mobile and desktop friendly',
		],
		screenshot: `${baseUrl}/screenshots/app-preview.jpg`,
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '127',
		},
	}
}
