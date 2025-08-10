'use client'

import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Trash2 } from 'lucide-react'
import ms from 'ms'
import { useTranslations } from 'next-intl'
import { useDebounceValue, useIsClient } from 'usehooks-ts'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { Loading } from '@atoms/loading'
import { Modal } from '@atoms/modal'
import { LOCALE_NAMESPACES } from '@const/languages'
import { useWifiCards, type WifiCard } from '@hooks/use-wifi-cards.hook'
import { WifiCardTable } from '@molecules/wifi/wifi-details-table'

const FOCUS_TIMEOUT = ms('0.15s')

export const WifiCardsList: FC = () => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const isClientSide = useIsClient()
	const { cards, removeCard } = useWifiCards()
	const [search, _setSearch] = useDebounceValue('', 300)
	const [view, _setView] = useState<'list' | 'card'>('list')
	const [selectedCard, setSelectedCard] = useState<WifiCard | null>(null)
	const deleteBtnRef = useRef<HTMLButtonElement>(null)

	const filtered = useMemo(() => {
		if (!search) return cards
		return cards.filter((c) => c.ssid.toLowerCase().includes(search.toLowerCase()))
	}, [cards, search])

	const onClose = () => {
		setSelectedCard(null)
	}
	const handleDelete = useCallback(() => {
		if (!selectedCard) return
		removeCard(selectedCard.id)
		setSelectedCard(null)
	}, [removeCard, selectedCard])

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (selectedCard) {
			timeout = setTimeout(() => {
				if (deleteBtnRef.current) {
					deleteBtnRef.current.focus()
				}
			}, FOCUS_TIMEOUT)
		}

		return () => timeout && clearTimeout(timeout)
	}, [selectedCard])

	return (
		<>
			<div className='w-full'>
				{/* <SearchSavedWifi onSearch={setSearch} defaultSearch={search} onClear={clearCards} selectedView={view} setView={setView} /> */}
				{!isClientSide ? (
					<span className='flex items-center justify-center h-64'>
						<Loading type='dots' />
					</span>
				) : filtered.length === 0 ? (
					<div className='text-center text-base-content-secondary py-8'>{t('wifi_details_table.not_found')}</div>
				) : view === 'card' ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{/* {filtered.map((card) => (
						<Card key={card.id} className='w-full'>
							<Card.Body className='flex flex-col gap-2'>
								<span className='font-semibold truncate'>{card.ssid}</span>
								<Button size='xs' variant='soft' colour='error' onClick={() => removeCard(card.id)}>
									Remove
								</Button>
							</Card.Body>
						</Card>
					))} */}
					</div>
				) : (
					// <ul className='divide-y divide-base-300'>
					// 	{filtered.map((card) => (
					// 		<li key={card.id} className='flex items-center justify-between py-2'>
					// 			<span className='truncate'>{card.ssid}</span>
					// 			<Button size='xs' variant='soft' colour='error' onClick={() => removeCard(card.id)}>
					// 				Remove
					// 			</Button>
					// 		</li>
					// 	))}
					// </ul>
					<WifiCardTable data={filtered} onDeleteClick={(wifiCard) => setSelectedCard(wifiCard)} />
				)}
			</div>
			<Modal open={Boolean(selectedCard)} onClose={onClose} autoFocus size='lg' position='center' showCloseButton closeOnBackdrop closeOnEsc>
				<div className='p-4'>
					<h2 className='text-lg font-semibold mb-2'>{t('modals.confirm_delete.title')}</h2>
					<p className='mb-4'>{t('modals.confirm_delete.description')}</p>
					{/* <div className='flex flex-col sm:flex-row flex-1 flex-wrap justify-between gap-2'> */}
					<div className='flex flex-1 gap-2 flex-col sm:flex-row items-center justify-end flex-wrap'>
						<Button variant='ghost' onClick={onClose}>
							{t('modals.confirm_delete.cancel')}
						</Button>
						<Button ref={deleteBtnRef} colour='error' onClick={handleDelete}>
							<Icon IconComponent={Trash2} size='sm' />
							{t('modals.confirm_delete.confirm')}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}
