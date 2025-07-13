import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { DEFAULT_LANGUAGE, LOCALE_NAMESPACES } from '@/constants/languages'

export const Header: FC = () => {
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const appTitle = t('app.title', {
		lng: DEFAULT_LANGUAGE,
	})

	return (
		<div className='sticky top-0 md:top-4 z-50 h-24 3xl:h-[10dvh] flex justify-center backdrop-blur-md md:backdrop-blur-none'>
			<div className='flex items-center justify-self-center gap-2 mb-4 max-w-sm md:backdrop-blur-xs md:rounded-full md:shadow-lg'>
				<img src='/beefi.svg' alt={`${appTitle} Logo`} className='size-20' />
				<p className='text-left pr-4 flex-1'>
					<h1 className='text-3xl font-bold text-gradient-bee font-title'>{appTitle}</h1>
					<p className='text-xs bottom-0 text-base-content'>{t('app.subtitle')}</p>
				</p>
			</div>
		</div>
	)
}
