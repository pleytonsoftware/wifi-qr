'use client'

import { redirect, usePathname } from '@navigation'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { LanguagesIcon } from 'lucide-react'

import { Dropdown } from '@atoms/dropdown'
import { AVAILABLE_LANGUAGES, LOCALE_DICTIONARY } from '@const/languages'
import { useLanguage } from '@hooks/use-language'

export const LanguageSelector = () => {
	const language = useLanguage()
	const path = usePathname()
	const params = useSearchParams()

	const languagesNode = useMemo(
		() =>
			AVAILABLE_LANGUAGES.map((lang) => (
				<Dropdown.Item
					key={lang}
					onClick={() =>
						redirect({
							href: {
								pathname: path,
								query: Object.fromEntries(params.entries()),
							},
							locale: lang,
						})
					}
					selected={language === lang}
				>
					<span>{LOCALE_DICTIONARY[lang]}</span>
				</Dropdown.Item>
			)),
		[AVAILABLE_LANGUAGES],
	)

	return (
		<Dropdown
			vertical='top'
			horizontal='end'
			buttonClassName='shadow-lg'
			menuClassName='max-h-60 overflow-y-auto'
			buttonContent={
				<Dropdown.Item className='flex items-center gap-2 text-sm font-medium text-base-content'>
					<LanguagesIcon className='text-primary w-4 h-4' />
					{LOCALE_DICTIONARY[language]}
				</Dropdown.Item>
			}
		>
			{languagesNode}
		</Dropdown>
	)
}
