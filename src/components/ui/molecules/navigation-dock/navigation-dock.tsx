'use client'

import type { FC } from 'react'

import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Dock } from '@atoms/dock'
import { Bee } from '@atoms/icon'
import { LOCALE_NAMESPACES } from '@const/languages'
import { ROUTES } from '@const/routes'
import { Theme } from '@const/theme'
import { useLanguage } from '@hooks/use-language'

import { Icon } from '@/components/ui/atoms'
import { ThemeToggler } from '@/components/ui/molecules/theme-toggler'
import { Link, redirect } from '@/i18n/navigation'

import { DockLanguageSelector } from './dock-language-selector'

type NavigationDockProps = {
	theme: string
}

export const NavigationDock: FC<NavigationDockProps> = ({ theme }) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const lang = useLanguage()

	return (
		<Dock className='flex md:hidden'>
			<DockLanguageSelector />
			<Dock.Item
				onClick={() => redirect({ href: { pathname: '/' }, locale: lang })}
				label={t('dock.home')}
				icon={
					<Link href={ROUTES.home}>
						<Icon IconComponent={Home} />
					</Link>
				}
			/>
			<Dock.Item
				icon={
					<Link href={ROUTES.wifiCards}>
						<Icon IconComponent={Bee} />
					</Link>
				}
				label={t('dock.wifi_cards')}
			/>
			<Dock.Item icon={<ThemeToggler defaultIsDarkMode={theme === Theme.dark} />} label={t('dock.theme')} />
		</Dock>
	)
}
