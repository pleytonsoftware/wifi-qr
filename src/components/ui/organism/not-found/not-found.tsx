import type { FC } from 'react'

import { getTranslations } from 'next-intl/server'

import { BeeHive, Icon } from '@atoms/icon'
import { Section } from '@atoms/section'
import { LOCALE_NAMESPACES } from '@const/languages'
import { ROUTES } from '@const/routes'

import { Link } from '@/i18n/navigation'

export const PageNotFound: FC = async () => {
	const t = await getTranslations(LOCALE_NAMESPACES.notFound)

	return (
		<Section heightType='full' className='flex flex-col justify-center items-center w-full h-full'>
			<div className='flex flex-1 flex-col justify-center items-center w-full'>
				<span
					className='select-none font-title font-extrabold text-primary flex items-center justify-center'
					style={{
						fontSize: 'clamp(6rem, 25vw, 18rem)',
						lineHeight: 1,
						letterSpacing: '-0.05em',
						userSelect: 'none',
						width: '100%',
						textAlign: 'center',
					}}
				>
					4
					<Icon
						IconComponent={BeeHive}
						style={
							{
								'--icon-size': 'clamp(5rem, 23vw, 16rem)',
								width: 'var(--icon-size)',
								height: 'var(--icon-size)',
							} as React.CSSProperties & Record<string, string | number>
						}
					/>
					4
				</span>
				<Link href={ROUTES.home} className='btn btn-link'>
					<span className='text-sm md:text-base'>{t('back_to_home')}</span>
				</Link>
			</div>
			<div className='mb-8 mt-2 text-center w-full'>
				<span className='text-base-content-secondary text-sm md:text-base'>🐝 {t('message')}</span>
			</div>
		</Section>
	)
}
