import Image from 'next/image'

import { getTranslations } from 'next-intl/server'

import { LOCALE_NAMESPACES } from '@const/languages'
import { MainDrawer } from '@molecules/main-drawer'

import { Link, redirect } from '@/i18n/navigation'
import { getAppName } from '@/utils/get-app-name'

export const Header = async () => {
	const t = await getTranslations(LOCALE_NAMESPACES.common)
	const appTitle = getAppName()

	return (
		<div className='sticky top-0 md:top-4 z-50 h-24 3xl:h-[10dvh] flex justify-center backdrop-blur-md md:backdrop-blur-none'>
			<MainDrawer />
			<Link href='/'>
				<div
					className='flex items-center justify-self-center gap-2 md:mb-4 max-w-sm md:backdrop-blur-xs md:rounded-full md:shadow-lg hover:bg-neutral/10 cursor-pointer'
					role='button'
				>
					<Image src='/beefi.svg' alt={`${appTitle} Logo`} width={80} height={80} className='size-20' />
					<div className='text-left pr-8 rtl:pl-8 flex-1'>
						<h1 className='text-3xl font-bold text-gradient-bee font-title'>{appTitle}</h1>
						<p className='text-xs bottom-0 text-base-content'>{t('app.subtitle')}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}
