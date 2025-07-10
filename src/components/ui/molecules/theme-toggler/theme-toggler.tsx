import { Icon } from '@atoms/icon/icon'
import { Swap } from '@atoms/swap/swap'
import { useDarkMode } from '@hooks/use-dark-mode.hook'
import { Moon, Sun } from 'lucide-react'
import { useEffect, type FC } from 'react'

export const ThemeToggler: FC = () => {
	const { isDarkMode, toggle } = useDarkMode()

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
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
