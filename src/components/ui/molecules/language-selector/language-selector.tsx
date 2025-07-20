'use client'

import { redirect, usePathname } from '@navigation'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { LanguagesIcon } from 'lucide-react'

import { Dropdown } from '@atoms/dropdown'
import { AVAILABLE_LANGUAGES, LOCALE_DICTIONARY } from '@const/languages'
import { useLanguage } from '@hooks/use-language'

import { AVAILABLE_LANGUAGE_FLAGS_DICTIONARY } from '@/assets/flags'

export const LanguageSelector = () => {
	const language = useLanguage()
	const path = usePathname()
	const params = useSearchParams()

	const languagesNode = useMemo(
		() =>
			AVAILABLE_LANGUAGES.map((lang) => {
				const flagProps = AVAILABLE_LANGUAGE_FLAGS_DICTIONARY[lang]
				const langName = LOCALE_DICTIONARY[lang]
				const { src, width, height } = flagProps || {}

				return (
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
						className='max-w-1/2'
					>
						<div>
							{flagProps && <Image {...{ src, width, height }} className='size-3' alt={langName} />}
							<span className='truncate'>{langName}</span>
						</div>
					</Dropdown.Item>
				)
			}),
		[AVAILABLE_LANGUAGES],
	)

	return (
		<Dropdown
			vertical='top'
			horizontal='end'
			buttonClassName='shadow-lg'
			menuClassName='w-64 max-h-60 overflow-y-auto'
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
