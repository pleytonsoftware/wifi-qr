import type { WebApplication, WithContext } from 'schema-dts'

import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import { DEFAULT_LANGUAGE, Languages, LOCALE_NAMESPACES } from '@/constants/languages'
import { getUrl } from '@/utils/get-site'

export const SEOHead = () => {
	const { t, i18n } = useTranslation([LOCALE_NAMESPACES.seo, LOCALE_NAMESPACES.common])

	const title = useMemo(() => {
		const seoTitle = t('seo:title')
		const appTitle = t('common:app.title', {
			lng: DEFAULT_LANGUAGE,
		})
		const separator = ' | '
		const maxLength = 70 // Updated to 70 chars

		const fullTitle = `${seoTitle}${separator}${appTitle}`

		if (fullTitle.length <= maxLength) {
			return fullTitle
		}

		// If full title is too long, truncate seo title
		const availableLength = maxLength - separator.length - appTitle.length
		const truncatedSeoTitle =
			availableLength > 0 ? seoTitle.substring(0, availableLength - 3) + '...' : appTitle.substring(0, maxLength - 3) + '...'

		return availableLength > 0 ? `${truncatedSeoTitle}${separator}${appTitle}` : truncatedSeoTitle
	}, [i18n.resolvedLanguage])

	const currentLang = i18n.language
	const baseUrl = getUrl()
	const currentUrl = currentLang === Languages.ENGLISH ? baseUrl : `${baseUrl}?lng=${currentLang}`

	// Schema markup
	const [websiteSchema] = useMemo(() => {
		const websiteSchema: WithContext<WebApplication> = {
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: t('common:app.title'),
			description: t('seo:description'),
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
				{
					'@type': 'Language',
					name: 'English',
					alternateName: 'en',
				},
				{
					'@type': 'Language',
					name: 'Spanish',
					alternateName: 'es',
				},
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

		// const breadcrumbSchema: WithContext<BreadcrumbList> = {
		// 	'@context': 'https://schema.org',
		// 	'@type': 'BreadcrumbList',
		// 	itemListElement: [
		// 		{
		// 			'@type': 'ListItem',
		// 			position: 1,
		// 			name: t('common:app.title'),
		// 			item: baseUrl,
		// 		},
		// 	],
		// }

		return [websiteSchema /*, breadcrumbSchema*/]
	}, [i18n.resolvedLanguage, baseUrl])

	return (
		<>
			<Helmet>
				<html lang={currentLang} />
				<title>{title}</title>
				<meta name='description' content={t('seo:description')} />
				<meta name='keywords' content={t('seo:keywords')} />

				{/* Canonical URL */}
				<link rel='canonical' href={currentUrl} />

				{/* Open Graph */}
				<meta property='og:title' content={t('seo:title')} />
				<meta property='og:description' content={t('seo:description')} />
				<meta property='og:url' content={currentUrl} />
				<meta property='og:type' content='website' />
				<meta property='og:site_name' content={t('common:app.title')} />
				<meta property='og:locale' content={currentLang === 'es' ? 'es_ES' : 'en_US'} />
				<meta property='og:image' content={`${baseUrl}/og-image.jpg`} />
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
				<meta property='og:image:alt' content={t('seo:title')} />

				{/* Twitter */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={t('seo:title')} />
				<meta name='twitter:description' content={t('seo:description')} />
				<meta name='twitter:image' content={`${baseUrl}/twitter-image.jpg`} />
				<meta name='twitter:image:alt' content={t('seo:title')} />

				{/* Additional meta tags */}
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow' />
				<meta name='theme-color' content='#2563eb' />
				<meta name='msapplication-TileColor' content='#2563eb' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content={t('common:app.title')} />
				<meta name='format-detection' content='telephone=no' />

				{/* Language alternates */}
				<link rel='alternate' hrefLang='en' href={baseUrl} />
				<link rel='alternate' hrefLang='es' href={`${baseUrl}?lng=es`} />
				<link rel='alternate' hrefLang='x-default' href={baseUrl} />

				{/* Favicon and app icons */}
				<link rel='icon' type='image/svg+xml' href='/beefi.svg' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<link rel='manifest' href='/manifest.json' />

				{/* Preconnect for performance */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
			</Helmet>
			{/* Schema markup */}
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
		</>
	)
}
