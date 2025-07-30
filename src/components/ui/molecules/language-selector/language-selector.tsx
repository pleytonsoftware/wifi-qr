'use client'

import { usePathname } from '@navigation'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { LanguagesIcon } from 'lucide-react'

import { Dropdown } from '@atoms/dropdown'
import { AVAILABLE_LANGUAGES, LOCALE_DICTIONARY } from '@const/languages'
import { useLanguage } from '@hooks/use-language'

import { AVAILABLE_LANGUAGE_FLAGS_DICTIONARY } from '@/assets/flags'

import { LanguageSelectorItem } from './language-selector-item'

type LanguageKey = keyof typeof AVAILABLE_LANGUAGE_FLAGS_DICTIONARY

export const LanguageSelector = () => {
	const language = useLanguage()
	const path = usePathname()
	const params = useSearchParams()

	const languagesNode = useMemo(
		() =>
			AVAILABLE_LANGUAGES.map((lang) => (
				<LanguageSelectorItem
					key={lang}
					lang={lang as LanguageKey}
					selected={language === lang}
					path={path}
					params={params}
					ParentComponent={Dropdown.Item}
				/>
			)),
		[AVAILABLE_LANGUAGES, language, path, params],
	)

	return (
		<Dropdown
			vertical='top'
			horizontal='end'
			buttonClassName='shadow-lg'
			menuClassName='w-64 max-h-60 overflow-y-auto'
			buttonContent={
				<Dropdown.Item className='flex items-center gap-2 text-sm font-medium text-base-content'>
					<LanguagesIcon className='text-primary size-4' />
					{LOCALE_DICTIONARY[language]}
				</Dropdown.Item>
			}
		>
			{languagesNode}
		</Dropdown>
	)
}
