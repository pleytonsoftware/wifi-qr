'use client'

import { MouseEvent, useCallback, type FC, type MouseEventHandler } from 'react'

import { Save } from 'lucide-react'
import ms from 'ms'
import { useTranslations } from 'next-intl'
import { useShallow } from 'zustand/shallow'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { LOCALE_NAMESPACES } from '@const/languages'
import { ROUTES } from '@const/routes'
import { useWifiCards } from '@hooks/use-wifi-cards.hook'
import { useWiFiQRStore, type WifiDetails } from '@store/wifi-qr.store'

import { useToast } from '@/components/hooks'
import { Tooltip } from '@/components/ui/atoms/tooltip/tooltip'
import { useRouter } from '@/i18n/navigation'

const SAVED_TOAST_MS = ms('8s')
type SaveWifiButtonProps = {
	onClear?: MouseEventHandler<HTMLButtonElement>
}
export const SaveWifiButton: FC<SaveWifiButtonProps> = ({ onClear }) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const { addCard } = useWifiCards()
	const { showToast } = useToast()
	const router = useRouter()
	const { isWifiValid, wifiDetails, wifiString } = useWiFiQRStore(
		useShallow((state) => ({
			isWifiValid: state.isWifiValid,
			wifiDetails: state.wifiDetails,
			wifiString: state.wifiString,
		})),
	)
	const handleSave = useCallback(
		(wifiDetails: WifiDetails, wifiString: string) => async (evt: MouseEvent<HTMLButtonElement>) => {
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
					button: {
						label: t('saved.toast.success.button'),
						onClick: (_evt, dismiss) => {
							router.push(ROUTES.wifiCards.index)
							dismiss()
						},
					},
				})
				onClear?.(evt)
			} catch (error) {
				showToast({
					title: t('saved.toast.error.title'),
					description: t('saved.toast.error.description'),
					variant: 'error',
				})
				// eslint-disable-next-line no-console
				console.error('Error saving WiFi configuration:', error)
			}
		},
		[],
	)

	return (
		<Tooltip content={t('buttons.save')}>
			<Button
				onClick={handleSave(wifiDetails, wifiString)}
				colour='accent'
				variant='soft'
				size='sm'
				shape='square'
				className='outline-0'
				aria-label={t('buttons.save')}
				disabled={!isWifiValid}
			>
				<Icon IconComponent={Save} size='md' />
			</Button>
		</Tooltip>
	)
}
