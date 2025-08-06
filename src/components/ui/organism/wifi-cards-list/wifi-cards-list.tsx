'use client'

import { type FC, MouseEventHandler, useMemo, useState } from 'react'

import { Trash2 } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { Modal } from '@atoms/modal'
import { useWifiCards, type WifiCard } from '@hooks/use-wifi-cards.hook'
import { WifiCardTable } from '@molecules/wifi-details-table'

export const WifiCardsList: FC = () => {
	const { cards, removeCard } = useWifiCards()
	const [search, setSearch] = useDebounceValue('', 300)
	const [view, setView] = useState<'list' | 'card'>('list')
	const [selectedCard, setSelectedCard] = useState<WifiCard | null>(null)

	const filtered = useMemo(() => {
		if (!search) return cards
		return cards.filter((c) => c.ssid.toLowerCase().includes(search.toLowerCase()))
	}, [cards, search])

	const onClose = () => {
		setSelectedCard(null)
	}
	const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (!selectedCard) return
		removeCard(selectedCard.id)
		setSelectedCard(null)
	}

	return (
		<>
			<div className='w-full'>
				{/* <SearchSavedWifi onSearch={setSearch} defaultSearch={search} onClear={clearCards} selectedView={view} setView={setView} /> */}
				{filtered.length === 0 ? (
					<div className='text-center text-base-content-secondary py-8'>No Wi-Fi cards found.</div>
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
			<Modal open={Boolean(selectedCard)} onClose={onClose} size='md' position='center' showCloseButton closeOnBackdrop closeOnEsc>
				<div className='p-4'>
					<h2 className='text-lg font-semibold mb-2'>Confirm Deletion</h2>
					<p className='mb-4'>Are you sure you want to delete this Wi-Fi card? This action cannot be undone.</p>
					<div className='flex justify-end gap-2'>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
						<Button colour='error' onClick={handleDelete}>
							Delete
							{/* <Icon IconComponent={Trash2} /> */}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}
