'use client'

import type { FC } from 'react'

import { Home } from 'lucide-react'

import { Dock } from '@atoms/dock'
import { Theme } from '@const/theme'
import { useLanguage } from '@hooks/use-language'

import { Icon } from '@/components/ui/atoms'
import { ThemeToggler } from '@/components/ui/molecules/theme-toggler'
import { redirect } from '@/i18n/navigation'

import { DockLanguageSelector } from './dock-language-selector'

type NavigationDockProps = {
	theme: string
}

export const NavigationDock: FC<NavigationDockProps> = ({ theme }) => {
	const lang = useLanguage()

	return (
		<Dock className='flex md:hidden'>
			<DockLanguageSelector />
			<Dock.Item onClick={() => redirect({ href: { pathname: '/' }, locale: lang })} label='Home' icon={<Icon IconComponent={Home} />} />
			<Dock.Item icon={<ThemeToggler defaultIsDarkMode={theme === Theme.dark} />} label='Theme' />
		</Dock>
	)
}
