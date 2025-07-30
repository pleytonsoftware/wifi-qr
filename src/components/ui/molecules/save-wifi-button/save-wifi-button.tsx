'use client'

import type { FC } from 'react'

import { Save } from 'lucide-react'
import ms from 'ms'
import { useTranslations } from 'next-intl'
import { useShallow } from 'zustand/shallow'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { LOCALE_NAMESPACES } from '@const/languages'
import { useWifiCards } from '@hooks/use-wifi-cards.hook'
import { useWiFiQRStore } from '@store/wifi-qr.store'

import { useToast } from '@/components/hooks'

const SAVED_TOAST_MS = ms('8s')
export const SaveWifiButton: FC = () => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const { addCard } = useWifiCards()
	const { showToast } = useToast()
	const { isWifiValid, wifiDetails, wifiString } = useWiFiQRStore(
		useShallow((state) => ({
			isWifiValid: state.isWifiValid,
			wifiDetails: state.wifiDetails,
			wifiString: state.wifiString,
		})),
	)

	return (
		<Button
			onClick={() => {
				try {
					addCard({
						...wifiDetails,
						wifiString,
					})
					showToast({
						title: t('saved.toast.success.title'),
						description: t('saved.toast.success.description'),
						variant: 'success',
						duration: SAVED_TOAST_MS,
						withProgress: true,
					})
				} catch (error) {
					// showToast({
					//   title: t('error'),
					//   description: t('saved.toast.error.description'),
					//   variant: 'error',
					// })
					console.error('Error saving WiFi configuration:', error)
				}
			}}
			colour='accent'
			variant='soft'
			size='sm'
			shape='square'
			className='outline-0'
			aria-label='save'
			disabled={!isWifiValid}
		>
			<Icon IconComponent={Save} size='md' />
		</Button>
	)
}
