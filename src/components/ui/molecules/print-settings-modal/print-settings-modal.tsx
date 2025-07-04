import type { FC } from 'react'

import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { Modal } from '@atoms/modal'
import { Toggle } from '@atoms/toggle'
import { WifiCard } from '@atoms/wifi-card'
import { Printer } from 'lucide-react'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { useWiFiQRStore } from '@/store/wifi-qr.store'

type PrintSettingsModalProps = {
	open: boolean
	onClose: () => void
	numberOfCards: number
	printWithSSID: boolean
	printWithPassword: boolean
	onValueChange?: <K extends keyof PrintSettingsModalState>(key: K, value: PrintSettingsModalState[K]) => void
	onPrint: () => void
}

const NUMBER_CARDS_LIMITS = { min: 1, max: 100 } as const
type PrintSettingsModalState = {
	numberOfCards: number
	printWithSSID: boolean
	printWithPassword: boolean
}

export const PrintSettingsModal: FC<PrintSettingsModalProps> = ({
	open,
	onClose,
	numberOfCards,
	printWithSSID,
	printWithPassword,
	onValueChange,
	onPrint,
}) => {
	const idPrefix = useId()
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const wifiDataUrl = useWiFiQRStore((state) => state.wifiDataUrl)
	const wifiDetails = useWiFiQRStore((state) => state.wifiDetails)

	return (
		<Modal open={open} onClose={onClose} size='xl' position='center' showCloseButton closeOnBackdrop closeOnEsc>
			<div className='flex flex-col-reverse lg:flex-row w-full space-x-4'>
				<div className='flex flex-col'>
					<div className='mb-4'>
						<h2 className='text-lg font-bold'>{t('print_setup.title')}</h2>
						<p className='text-sm text-base-content-secondary'>{t('print_setup.description')}</p>
					</div>
					<div className='space-y-4'>
						<div className='space-y-2'>
							<Input
								id={`${idPrefix}-card-count`}
								type='number'
								legend={t('print_setup.number_of_cards.legend')}
								min={NUMBER_CARDS_LIMITS.min}
								max={NUMBER_CARDS_LIMITS.max}
								value={numberOfCards}
								onChange={(e) => {
									const value = Math.max(
										NUMBER_CARDS_LIMITS.min,
										Math.min(NUMBER_CARDS_LIMITS.max, Number.parseInt(e.target.value) || NUMBER_CARDS_LIMITS.min),
									)
									onValueChange?.('numberOfCards', value)
								}}
								className='w-full'
								label={t('print_setup.number_of_cards.label', { min: NUMBER_CARDS_LIMITS.min, max: NUMBER_CARDS_LIMITS.max })}
							/>
						</div>
						<div className='flex flex-col space-y-3'>
							<span className='text-sm font-medium'>{t('print_setup.card_content.title')}</span>
							<div className='flex items-center space-x-2'>
								<Toggle
									label={t('print_setup.card_content.display_ssid')}
									id={`${idPrefix}-print-ssid`}
									checked={printWithSSID}
									onValueChange={(printWithSSID) => onValueChange?.('printWithSSID', printWithSSID)}
								/>
							</div>
							{wifiDetails.securityType !== 'nopass' && (
								<div className='flex items-center space-x-2'>
									<Toggle
										label={t('print_setup.card_content.display_password')}
										id={`${idPrefix}-print-password`}
										checked={printWithPassword}
										onValueChange={(printWithPassword) => onValueChange?.('printWithPassword', printWithPassword)}
									/>
								</div>
							)}
						</div>
					</div>
					<div className='flex gap-2 justify-between mt-6'>
						<Button variant='outline' onClick={onClose}>
							{t('buttons.cancel')}
						</Button>
						<Button onClick={onPrint} className='flex items-center gap-2'>
							<Printer className='h-4 w-4' />
							{t('buttons.print_cards', { count: numberOfCards })}
						</Button>
					</div>
				</div>
				<div className='flex flex-col mx-auto items-center justify-center w-64 p-4 lg:border-l lg:border-base-300'>
					<WifiCard
						ssid={printWithSSID ? wifiDetails.ssid : undefined}
						password={printWithPassword ? wifiDetails.password : undefined}
						dataUrl={wifiDataUrl || ''}
					/>
				</div>
			</div>
		</Modal>
	)
}
