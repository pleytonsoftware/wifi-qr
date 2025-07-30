import { useSearchParams } from 'next/navigation'
import { useRef, type FC } from 'react'

import { LanguagesIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBoolean } from 'usehooks-ts'

import { AVAILABLE_LANGUAGE_FLAGS_DICTIONARY } from '@assets/flags'
import { Dock } from '@atoms/dock'
import { Icon } from '@atoms/icon'
import { Menu } from '@atoms/menu'
import { AVAILABLE_LANGUAGES, LOCALE_NAMESPACES } from '@const/languages'
import { useLanguage } from '@hooks/use-language'
import { LanguageSelectorItem } from '@molecules/language-selector'

import { usePathname } from '@/i18n/navigation'

export const DockLanguageSelector: FC = () => {
	const { value: showMenu, toggle: toggleMenu, setFalse: closeMenu } = useBoolean(false)
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const language = useLanguage()
	const path = usePathname()
	const params = useSearchParams()
	const ref = useRef<HTMLButtonElement>(null)

	return (
		<Dock.Item
			as='div'
			ref={ref}
			className='relative'
			icon={
				<div>
					<Icon IconComponent={LanguagesIcon} />
					{showMenu && (
						<Menu
							onClickOutside={closeMenu}
							ignoredOutsideClickTargets={[ref.current].filter(Boolean) as HTMLElement[]}
							className='absolute bottom-full left-0 rtl:right-0 z-10 mb-5 max-h-60 overflow-y-auto w-[80dvw]'
						>
							{AVAILABLE_LANGUAGES.map((lang) => (
								<LanguageSelectorItem
									key={lang}
									lang={lang as keyof typeof AVAILABLE_LANGUAGE_FLAGS_DICTIONARY}
									selected={language === lang}
									selectedKey='active'
									path={path}
									params={params}
									ParentComponent={Menu.Item}
								/>
							))}
						</Menu>
					)}
				</div>
			}
			label={t('dock.language')}
			onClick={(evt) => {
				evt.stopPropagation()
				evt.preventDefault()

				if (showMenu) {
					closeMenu()
				} else {
					toggleMenu()
				}
			}}
		/>
	)
}
