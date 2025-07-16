import '@/app/globals.css'

import type { Metadata, ResolvingMetadata } from 'next'
import type { ReactNode } from 'react'

import { getTranslations } from 'next-intl/server'
import { Montserrat, Quicksand } from 'next/font/google'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { Theme } from '@/constants/theme'
import { LayoutProps } from '@/types/global'
import { getPageTitle } from '@/utils/get-app-name'
import { getServerSideTheme } from '@/utils/theme'
import { cn } from '@cn'
import { LocaleLayout, type ResolveLocaleLayoutProps, withLocale } from '@layout/locale-layout'
import { Footer } from '@molecules/footer'
import { Header } from '@molecules/header'
import { LanguageSelector } from '@molecules/language-selector'
import { ThemeToggler } from '@molecules/theme-toggler'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	style: ['italic', 'normal'],
})

const quicksand = Quicksand({
	variable: '--font-quicksand',
	subsets: ['latin'],
	display: 'swap',
})

export async function generateMetadata(_props: LayoutProps, _parent: ResolvingMetadata): Promise<Metadata> {
	const t = await getTranslations(LOCALE_NAMESPACES.seo)

	const title = getPageTitle(t)

	return {
		title,
	}
}

const RootLayout = async ({
	children,
	...props
}: ResolveLocaleLayoutProps<{
	children: ReactNode
}>) => {
	const { theme, themeDataAttributes } = await getServerSideTheme()

	return (
		<LocaleLayout {...props} className={cn(montserrat.className, quicksand.className)} htmlProps={{ ...themeDataAttributes }}>
			<div className='min-h-dvh w-full bg-base dark:bg-base-100 relative'>
				<div className='absolute inset-0 z-0 bg-wifiqr-gradient'>
					<div className='h-full w-full bg-wifiqr-pattern-gradient' />
				</div>
				<div className='min-h-dvh bg-transparent relative'>
					<Header />
					<div className='min-h-[calc(100dvh-calc(var(--spacing)*24))] md:mt-[calc(var(--spacing)*-8)] flex flex-col justify-center p-4'>
						<div className='max-w-4xl 3xl:max-w-7xl w-full mx-auto flex flex-col space-y-6'>
							{children}
							<div className='fixed bottom-4 right-4 flex items-center gap-2 z-50'>
								<LanguageSelector />
								<ThemeToggler defaultIsDarkMode={theme === Theme.dark} />
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</LocaleLayout>
	)
}

export default withLocale(RootLayout)
