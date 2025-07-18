'use client'

import { useEffect, type FC } from 'react'

import { Moon, Sun } from 'lucide-react'

import { Icon } from '@atoms/icon/icon'
import { Swap } from '@atoms/swap/swap'
import { Theme } from '@const/theme'
import { useDarkMode } from '@hooks/use-dark-mode.hook'

type ThemeTogglerProps = {
	defaultIsDarkMode?: boolean
}

export const ThemeToggler: FC<ThemeTogglerProps> = ({ defaultIsDarkMode }) => {
	const { isDarkMode, toggle } = useDarkMode({
		defaultValue: defaultIsDarkMode,
	})

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDarkMode ? Theme.dark : Theme.light)
	}, [isDarkMode])

	return (
		<Swap
			onElement={<Icon IconComponent={Moon} />}
			offElement={<Icon IconComponent={Sun} />}
			effect='rotate'
			active={isDarkMode}
			onValueChange={toggle}
			aria-label='Toggle theme'
		/>
	)
}
