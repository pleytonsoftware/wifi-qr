'use client'

import type { WifiCard } from '@/components/hooks/use-wifi-cards.hook'
import type { FC } from 'react'

import { useCallback, useMemo, useState } from 'react'

import { cn } from '@cn'

import { useLocale, useTranslations } from 'next-intl'

import { Table } from '@atoms/table'

import { LOCALE_NAMESPACES } from '@/constants/languages'

import { WifiDetailsQRDisplayModal } from './wifi-details-qr-display-modal'
import { WifiDetailsRow } from './wifi-details-row'

type WifiCardTableProps = {
	data: WifiCard[]
	onQRClick?: (wifiCard: WifiCard) => void
	onDetailsClick?: (wifiCard: WifiCard) => void
	onDeleteClick?: (wifiCard: WifiCard) => void
	bordered?: boolean
	zebra?: boolean
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	className?: string
}

export const WifiCardTable: FC<WifiCardTableProps> = ({
	data,
	onQRClick,
	onDetailsClick,
	onDeleteClick,
	bordered = false,
	zebra = false,
	size = 'md',
	className,
}) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const language = useLocale()
	const [selectedQRCard, setSelectedQRCard] = useState<WifiCard | undefined>(undefined)
	// const router = useRouter()

	const handleQRClick = useCallback(
		(wifiCard: WifiCard) => {
			onQRClick?.(wifiCard)
			setSelectedQRCard(wifiCard)
		},
		[onQRClick],
	)
	const handleCloseModal = useCallback(() => {
		setSelectedQRCard(undefined)
	}, [])

	const rows = useMemo(
		() =>
			data.map((wifiCard) => (
				<WifiDetailsRow
					key={wifiCard.id}
					wifiCard={wifiCard}
					language={language}
					onQRClick={handleQRClick}
					// onDetailsClick={(wifiCard) => router.push(ROUTES.wifiCards.edit(wifiCard.id))}
					onDeleteClick={onDeleteClick}
				/>
			)),
		[data, handleQRClick, onDetailsClick, onDeleteClick, t],
	)

	return (
		<div className={cn(bordered ? 'overflow-x-auto rounded-box border border-base-content/5 bg-base-100' : 'overflow-x-auto')}>
			<Table zebra={zebra} size={size} className={className}>
				<Table.Head>
					<Table.Row>
						<Table.HeaderCell>#</Table.HeaderCell>
						<Table.HeaderCell>{t('wifi_details_table.qr_code')}</Table.HeaderCell>
						<Table.HeaderCell>{t('wifi_details_table.ssid')}</Table.HeaderCell>
						<Table.HeaderCell>{t('wifi_details_table.security')}</Table.HeaderCell>
						<Table.HeaderCell>{t('wifi_details_table.hidden')}</Table.HeaderCell>
						<Table.HeaderCell>{t('wifi_details_table.created')}</Table.HeaderCell>
						<Table.HeaderCell>{t('wifi_details_table.actions')}</Table.HeaderCell>
					</Table.Row>
				</Table.Head>
				<Table.Body>{rows}</Table.Body>
			</Table>
			<WifiDetailsQRDisplayModal selectedQRCard={selectedQRCard} onCloseModal={handleCloseModal} />
		</div>
	)
}
