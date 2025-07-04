import { Dropdown } from '@atoms/dropdown'
import { LanguagesIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Languages, LOCALE_NAMESPACES, SUPPORTED_LANGUAGES } from '@/constants/languages'

export const LanguageSelector = () => {
	const { t, i18n } = useTranslation(LOCALE_NAMESPACES.languages, {
		lng: Languages.ENGLISH,
	})

	const languagesNode = useMemo(
		() =>
			SUPPORTED_LANGUAGES.map((lang) => (
				<Dropdown.Item key={lang} onClick={() => i18n.changeLanguage(lang)} selected={i18n.resolvedLanguage === lang}>
					<span>{t(`languages.${lang}`)}</span>
				</Dropdown.Item>
			)),
		[i18n.languages],
	)

	return (
		<div className='fixed bottom-4 right-4'>
			<Dropdown
				vertical='top'
				horizontal='end'
				buttonClassName='shadow-lg'
				menuClassName='max-h-60 overflow-y-auto'
				buttonContent={
					<Dropdown.Item className='flex items-center gap-2 text-sm font-medium text-base-content'>
						<LanguagesIcon className='text-secondary w-4 h-4' />
						{t(`languages.${i18n.resolvedLanguage}`)}
					</Dropdown.Item>
				}
			>
				{languagesNode}
			</Dropdown>
		</div>
	)
}
