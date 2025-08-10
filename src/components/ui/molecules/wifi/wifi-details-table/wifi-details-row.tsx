import type { WifiCard } from '@/components/hooks/use-wifi-cards.hook'

import { useCallback, useRef, type FC } from 'react'

import { cn } from '@cn'

import { Eye, MoreVertical, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { QRCodeSVG } from 'qrcode.react'
import { useBoolean } from 'usehooks-ts'

import { Badge, type BadgeColour } from '@atoms/badge'
import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { Menu } from '@atoms/menu'
import { Portal } from '@atoms/portal'
import { Table } from '@atoms/table'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { maskPassword } from '@/utils/mask-password'

type WifiDetailsRowProps = {
	wifiCard: WifiCard
	language: string
	onQRClick: (wifiCard: WifiCard) => void
	onDetailsClick?: (wifiCard: WifiCard) => void
	onDeleteClick?: (wifiCard: WifiCard) => void
}

const getSecurityBadgeVariant = (securityType?: string): BadgeColour => {
	switch ((securityType || '').toLowerCase()) {
		case 'wpa':
		case 'wpa2':
			return 'success'
		case 'wep':
			return 'warning'
		case 'nopass':
			return 'error'
		default:
			return 'neutral'
	}
}

export const WifiDetailsRow: FC<WifiDetailsRowProps> = ({ wifiCard, language, onQRClick, onDetailsClick, onDeleteClick }) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const moreButtonRef = useRef<HTMLButtonElement>(null)
	const { value: isMenuOpen, setTrue: openMenu, setFalse: closeMenu } = useBoolean(false)

	const handleQRClick = useCallback(() => {
		onQRClick(wifiCard)
	}, [onQRClick, wifiCard])
	const handleDeleteClick = useCallback(() => {
		onDeleteClick?.(wifiCard)
		closeMenu()
	}, [onDeleteClick, wifiCard])

	return (
		<Table.Row key={wifiCard.id} hover>
			<Table.HeaderCell>{wifiCard.id.slice(-3)}</Table.HeaderCell>
			<Table.Cell>
				<div className='flex items-center justify-center'>
					<button
						onClick={handleQRClick}
						className='cursor-pointer hover:scale-105 transition-transform duration-200'
						aria-label={t('wifi_details_table.qr_code_aria', { ssid: wifiCard.ssid })}
					>
						<div className='w-16 h-16 p-1 bg-white rounded-lg shadow-sm border border-base-300'>
							<QRCodeSVG value={wifiCard.wifiString} size={56} className='w-full h-full' />
						</div>
					</button>
				</div>
			</Table.Cell>
			<Table.Cell>
				<div className='flex flex-col'>
					<div className='font-bold text-base'>{wifiCard.ssid || t('wifi_details_table.unnamed_network')}</div>
					{wifiCard.accessPassword && (
						<div className='text-sm opacity-50 font-mono'>
							{t('wifi_details_table.password')}: {maskPassword(wifiCard.accessPassword)}
						</div>
					)}
				</div>
			</Table.Cell>
			<Table.Cell>
				<Badge colour={getSecurityBadgeVariant(wifiCard.securityType)} size='sm'>
					{(wifiCard.securityType || '').toUpperCase()}
				</Badge>
			</Table.Cell>
			<Table.Cell>
				<Badge colour={wifiCard.hiddenNetwork ? 'warning' : 'success'} size='sm' variant='outline'>
					{wifiCard.hiddenNetwork ? t('wifi_details_table.hidden') : t('wifi_details_table.visible')}
				</Badge>
			</Table.Cell>
			<Table.Cell>
				<span className='text-xs opacity-70 font-mono'>
					{wifiCard.createdAt
						? new Intl.DateTimeFormat(['eu', 'gl'].includes(language) ? 'es-ES' : language, {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								second: '2-digit',
							}).format(new Date(wifiCard.createdAt))
						: '-'}
				</span>
			</Table.Cell>
			<Table.Cell className={cn([onDetailsClick, onDeleteClick].filter(Boolean).length > 1 ? 'text-right' : 'text-center')}>
				<div className='flex items-center justify-center gap-2'>
					{onDetailsClick && (
						<Button
							variant='ghost'
							size='xs'
							shape='square'
							onClick={() => onDetailsClick(wifiCard)}
							title={t('wifi_details_table.details')}
						>
							<Icon IconComponent={Eye} size='sm' />
						</Button>
					)}
					{/* {onDeleteClick && (
						<Button
							variant='ghost2'
							colour='error'
							size='sm'
							shape='square'
							onClick={() => onDeleteClick(wifiCard)}
							aria-label={t('wifi_details_table.delete')}
							title={t('wifi_details_table.delete')}
							// className='text-error hover:text-inherit'
						>
							<Icon IconComponent={Trash2} size='sm' />
						</Button>
					)} */}
					<div className='relative'>
						<Button
							variant='ghost2'
							colour='base'
							shape='square'
							size='sm'
							onClick={openMenu}
							aria-label={t('wifi_details_table.more_actions')}
							title={t('wifi_details_table.more_actions')}
							ref={moreButtonRef}
						>
							<Icon IconComponent={MoreVertical} size='sm' />
						</Button>
						{isMenuOpen && (
							<Portal>
								<Menu anchorRef={moreButtonRef} onClickOutside={closeMenu} position='bottom-end'>
									{onDetailsClick && (
										<Menu.Item onClick={() => onDetailsClick(wifiCard)}>
											<Icon IconComponent={Eye} size='sm' /> {t('wifi_details_table.details')}
										</Menu.Item>
									)}
									{onDeleteClick && (
										<Menu.Item className='text-error' title={t('wifi_details_table.delete')} onClick={handleDeleteClick}>
											<Icon IconComponent={Trash2} size='sm' /> {t('wifi_details_table.delete')}
										</Menu.Item>
									)}
								</Menu>
							</Portal>
						)}
					</div>
				</div>
			</Table.Cell>
		</Table.Row>
	)
}
