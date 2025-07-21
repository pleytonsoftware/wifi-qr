import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRef, type FC } from 'react'

import { Globe, LanguagesIcon } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'

import { AVAILABLE_LANGUAGE_FLAGS_DICTIONARY } from '@assets/flags'
import { Dock } from '@atoms/dock'
import { Icon } from '@atoms/icon'
import { Menu } from '@atoms/menu'
import { AVAILABLE_LANGUAGES, LOCALE_DICTIONARY } from '@const/languages'
import { useLanguage } from '@hooks/use-language'

import { redirect, usePathname } from '@/i18n/navigation'

export const DockLanguageSelector: FC = () => {
	const { value: showMenu, toggle: toggleMenu, setFalse: closeMenu } = useBoolean(false)
	const language = useLanguage()
	const path = usePathname()
	const params = useSearchParams()
	const ref = useRef<HTMLButtonElement>(null)

	return (
		<Dock.Item
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
							{AVAILABLE_LANGUAGES.map((lang, index) => {
								const flagProps = AVAILABLE_LANGUAGE_FLAGS_DICTIONARY[lang]
								const langName = LOCALE_DICTIONARY[lang]
								const { src, width, height } = flagProps || {}

								return (
									<Menu.Item active={language === lang} key={index}>
										<div
											className='flex items-center gap-2'
											role='button'
											onClick={() =>
												redirect({
													href: {
														pathname: path,
														query: Object.fromEntries(params.entries()),
													},
													locale: lang,
												})
											}
										>
											{flagProps ? (
												<Image {...{ src, width, height }} className='size-3' alt={langName} />
											) : (
												<Icon IconComponent={Globe} />
											)}
											<span className='truncate'>{langName}</span>
										</div>
									</Menu.Item>
								)
							})}
						</Menu>
					)}
				</div>
			}
			label='Language'
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
