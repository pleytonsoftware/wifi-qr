import { useCallback } from 'react'

import { useLocalStorage } from 'usehooks-ts'

import { getAppName } from '@/utils/get-app-name'

export type WifiCard = {
	id: string // uuid or timestamp
	ssid: string
	accessPassword?: string
	securityType?: string
	hiddenNetwork?: boolean
	createdAt: number
	wifiString: string
}

const STORAGE_KEY = `${getAppName()}-wifiqr-cards-v1`
const MAX_CARDS = 10

export function useWifiCards() {
	const [cards, setCards] = useLocalStorage<WifiCard[]>(STORAGE_KEY, [], {
		initializeWithValue: false,
	})
	const addCard = useCallback(
		(card: Omit<WifiCard, 'id' | 'createdAt'>) => {
			const newCard: WifiCard = {
				...card,
				id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				createdAt: Date.now(),
				accessPassword: card.securityType === 'nopass' ? undefined : card.accessPassword,
			}
			setCards((prev) => [newCard, ...prev].slice(0, MAX_CARDS))
		},
		[setCards],
	)
	const removeCard = useCallback(
		(id: string) => {
			setCards((prev) => prev.filter((c) => c.id !== id))
		},
		[setCards],
	)
	const clearCards = useCallback(() => setCards([]), [setCards])

	return {
		cards,
		addCard,
		removeCard,
		clearCards,
	}
}
