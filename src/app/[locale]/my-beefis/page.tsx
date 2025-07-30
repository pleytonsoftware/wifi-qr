import { WifiCardsList } from '@molecules/wifi-cards-list'

export default function WifiCardsPage() {
	return (
		<main className='container mx-auto py-8'>
			<h1 className='text-2xl font-bold mb-6'>Saved Wi-Fi Cards</h1>
			<WifiCardsList />
		</main>
	)
}
