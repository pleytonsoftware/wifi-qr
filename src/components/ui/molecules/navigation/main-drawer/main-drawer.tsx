'use client'

import type { FC } from 'react'

import Image from 'next/image'

import { ArrowLeftFromLine, Home } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBoolean } from 'usehooks-ts'

import { Button } from '@atoms/button'
import { Drawer } from '@atoms/drawer'
import { BeeHive, Bee, Icon } from '@atoms/icon'
import { Menu } from '@atoms/menu'
import { ROUTES } from '@const/routes'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { Link } from '@/i18n/navigation'

export const MainDrawer: FC = () => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const { value: isOpen, setValue: setIsOpen, setTrue: openDrawer, setFalse: closeDrawer } = useBoolean(false)

	return (
		<div className='absolute ltr:left-4 rtl:right-4 top-4 hidden md:flex items-center gap-2'>
			<Drawer toggleId='my-drawer' open={isOpen} onToggle={(b) => setIsOpen(b as boolean)} placement='left'>
				<Drawer.Content className='hidden md:block'>
					<Drawer.Button onClick={openDrawer} variant='link' colour='base' aria-label='open' title='open' className='outline-0 group'>
						<Icon IconComponent={BeeHive} />
						<span className='opacity-0 -translate-x-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0'>
							{t('main_drawer.menu_button')}
						</span>
					</Drawer.Button>
				</Drawer.Content>
				<Drawer.Side onOverlayClick={closeDrawer}>
					<Menu className='min-h-full w-80 bg-gradient-to-br from-base-100 to-base-200 p-4'>
						<div className='flex justify-between items-center gap-2 mb-4 pl-1.5'>
							<Image src='/beefi.svg' alt='BeeFi Icon' width={32} height={32} className='size-8' />
							<Button onClick={closeDrawer} variant='link' colour='base' className='outline-0' aria-label='close'>
								<Icon IconComponent={ArrowLeftFromLine} size='md' />
							</Button>
						</div>
						<Link onClick={closeDrawer} href={ROUTES.home} aria-label={t('main_drawer.home')} className='flex items-center gap-2 w-full'>
							<Menu.Item>
								<Icon IconComponent={Home} className='text-primary' /> {t('main_drawer.home')}
							</Menu.Item>
						</Link>
						<Link
							onClick={closeDrawer}
							href={ROUTES.wifiCards.index}
							aria-label={t('main_drawer.wifi_cards')}
							className='flex items-center gap-2'
						>
							<Menu.Item>
								<Icon IconComponent={Bee} className='text-primary' /> {t('main_drawer.wifi_cards')}
							</Menu.Item>
						</Link>
					</Menu>
				</Drawer.Side>
			</Drawer>
		</div>
	)
}
