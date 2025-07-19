import '@/app/globals.css'

import type { LayoutProps } from '@app-types/app'
import type { Metadata, ResolvingMetadata } from 'next'
import type { ReactNode } from 'react'

import { getTranslations } from 'next-intl/server'

import { FloatingControls } from '@atoms/floating-controls'
import { AVAILABLE_LANGUAGES, LOCALE_NAMESPACES } from '@const/languages'
import { LocaleLayout, type ResolveLocaleLayoutProps, withLocale } from '@layout/locale-layout'
import { Footer } from '@molecules/footer'
import { Header } from '@molecules/header'
import { ToastProvider } from '@providers/toast.provider'

import { getAppName, getPageTitle } from '@/utils/get-app-name'
import { getUrl } from '@/utils/get-site'
import { getWebsiteSchema } from '@/utils/seo/generate-website-schema'
import { getServerSideTheme } from '@/utils/theme'

export async function generateMetadata({ params }: LayoutProps, _parent: ResolvingMetadata): Promise<Metadata> {
	const locale = (await params).locale
	const t = await getTranslations(LOCALE_NAMESPACES.seo)
	const baseUrl = getUrl()
	const appTitle = getAppName()
	const title = getPageTitle(t)

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

const RootLayout = async ({
	children,
	...props
}: ResolveLocaleLayoutProps<{
	children: ReactNode
}>) => {
	const websiteSchema = await getWebsiteSchema()
	const { theme, themeDataAttributes } = await getServerSideTheme()

	return (
		<ToastProvider>
			<LocaleLayout {...props} htmlProps={{ ...themeDataAttributes }}>
				<>
					<div className='min-h-dvh w-full bg-base dark:bg-base-100 relative'>
						<div className='absolute inset-0 z-0 bg-wifiqr-gradient'>
							<div className='h-full w-full bg-wifiqr-pattern-gradient' />
						</div>
						<div className='min-h-dvh bg-transparent relative'>
							<Header />
							<div className='min-h-[calc(100dvh-calc(var(--spacing)*24))] md:mt-[calc(var(--spacing)*-8)] flex flex-col justify-center p-4'>
								<div className='max-w-4xl 3xl:max-w-7xl w-full mx-auto flex flex-col space-y-6'>
									{children}
									<FloatingControls theme={theme} />
								</div>
							</div>
							<Footer />
						</div>
					</div>
					<script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
				</>
			</LocaleLayout>
		</ToastProvider>
	)
}

export default withLocale(RootLayout)
