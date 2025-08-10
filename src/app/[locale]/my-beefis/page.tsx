import { getTranslations } from 'next-intl/server'

import { LOCALE_NAMESPACES } from '@const/languages'

import { WifiCardsList } from '@/components/ui/organism/wifi-cards-list/wifi-cards-list'

export default async function WifiCardsPage() {
	const t = await getTranslations(LOCALE_NAMESPACES.common)
	return (
		<main className='container mx-auto py-8'>
			<h1 className='text-2xl font-bold mb-6'>{t('main_drawer.wifi_cards')}</h1>
			<WifiCardsList />
		</main>
	)
}
