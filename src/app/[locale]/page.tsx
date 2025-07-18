import type { LayoutProps } from '@app-types/global'
import type { Metadata, ResolvingMetadata } from 'next'
import type { WebApplication, WithContext } from 'schema-dts'

import { getTranslations } from 'next-intl/server'

import { LOCALE_NAMESPACES, AVAILABLE_LANGUAGES } from '@const/languages'
import { WiFiQRGenerator } from '@organism/wifi-qr-generator'

import { getAppName } from '@/utils/get-app-name'
import { getUrl } from '@/utils/get-site'

export async function generateMetadata({ params }: LayoutProps, _parent: ResolvingMetadata): Promise<Metadata> {
	const locale = (await params).locale
	const t = await getTranslations(LOCALE_NAMESPACES.seo)
	const baseUrl = getUrl()

	const seoTitle = t('title')
	const appTitle = getAppName()
	const separator = ' | '
	const maxLength = 60
	const fullTitle = `${seoTitle}${separator}${appTitle}`
	const title =
		fullTitle.length <= maxLength
			? fullTitle
			: `${seoTitle.substring(0, maxLength - separator.length - appTitle.length - 3)}...${separator}${appTitle}`

	return {
		title,
		description: t('description'),
		keywords: t('keywords'),
		alternates: {
			canonical: baseUrl,
			languages: Object.fromEntries(AVAILABLE_LANGUAGES.map((lang) => [lang, `${baseUrl}/${lang}`])),
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: baseUrl,
			type: 'website',
			siteName: appTitle,
			locale: locale === 'es' ? 'es_ES' : 'en_US',
			images: [
				{
					url: `${baseUrl}/beefi.webp`,
					width: 512,
					height: 512,
					alt: t('title'),
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: [`${baseUrl}/beefi.webp`],
		},
		icons: {
			icon: '/beefi.ico',
			apple: '/apple-touch-icon.png',
		},
		metadataBase: baseUrl ? new URL(baseUrl) : undefined,
		other: {
			robots: 'index, follow',
			googlebot: 'index, follow',
			'theme-color': '#fbc600',
			'msapplication-TileColor': '#fbc600',
			'apple-mobile-web-app-capable': 'yes',
			'apple-mobile-web-app-status-bar-style': 'default',
			'apple-mobile-web-app-title': appTitle,
			'format-detection': 'telephone=no',
		},
	}
}

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

export default async function HomePage() {
	const websiteSchema = await getWebsiteSchema()

	return (
		<>
			<WiFiQRGenerator />
			<script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
		</>
	)
}
