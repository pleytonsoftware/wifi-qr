'use client'

import { type FC, useMemo, useState } from 'react'

import { Button } from '@atoms/button'
import { Card } from '@atoms/card'
import { Input } from '@atoms/input'
import { useWifiCards } from '@hooks/use-wifi-cards.hook'

export const WifiCardsList: FC = () => {
	const { cards, removeCard, clearCards } = useWifiCards()
	const [search, setSearch] = useState('')
	const [view, setView] = useState<'list' | 'card'>('card')

	const filtered = useMemo(() => {
		if (!search) return cards
		return cards.filter((c) => c.ssid.toLowerCase().includes(search.toLowerCase()))
	}, [cards, search])

	return (
		<div className='w-full'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4'>
				<Input placeholder='Search SSID...' value={search} onChange={(e) => setSearch(e.target.value)} className='w-full md:w-1/2' />
				<div className='flex gap-2'>
					<Button size='sm' variant={view === 'card' ? 'default' : 'outline'} onClick={() => setView('card')}>
						Card
					</Button>
					<Button size='sm' variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
						List
					</Button>
					<Button size='sm' variant='soft' colour='error' onClick={clearCards}>
						Clear All
					</Button>
				</div>
			</div>
			{filtered.length === 0 ? (
				<div className='text-center text-base-content-secondary py-8'>No Wi-Fi cards found.</div>
			) : view === 'card' ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{filtered.map((card) => (
						<Card key={card.id} className='w-full'>
							<Card.Body className='flex flex-col gap-2'>
								<span className='font-semibold truncate'>{card.ssid}</span>
								<Button size='xs' variant='soft' colour='error' onClick={() => removeCard(card.id)}>
									Remove
								</Button>
							</Card.Body>
						</Card>
					))}
				</div>
			) : (
				<ul className='divide-y divide-base-300'>
					{filtered.map((card) => (
						<li key={card.id} className='flex items-center justify-between py-2'>
							<span className='truncate'>{card.ssid}</span>
							<Button size='xs' variant='soft' colour='error' onClick={() => removeCard(card.id)}>
								Remove
							</Button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
