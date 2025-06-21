import type { FC } from 'react'

import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { Modal } from '@atoms/modal'
import { Toggle } from '@atoms/toggle'
import { Printer } from 'lucide-react'

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
	const securityType = useWiFiQRStore((state) => state.wifiDetails.securityType)

	return (
		<Modal open={open} onClose={onClose} size='md' position='center' showCloseButton closeOnBackdrop closeOnEsc>
			<div className='max-w-md w-full'>
				<div className='mb-4'>
					<h2 className='text-lg font-bold'>Print Settings</h2>
					<p className='text-sm text-base-content-secondary'>Configure your print options for the Wi-Fi QR code cards.</p>
				</div>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Input
							id='card-count'
							type='number'
							legend='Number of Cards'
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
							label={`Print between ${NUMBER_CARDS_LIMITS.min} and ${NUMBER_CARDS_LIMITS.max} cards`}
						/>
					</div>
					<div className='flex flex-col space-y-3'>
						<span className='text-sm font-medium'>Card Content</span>
						<div className='flex items-center space-x-2'>
							<Toggle
								label='Display Network name (SSID)'
								id='print-ssid'
								checked={printWithSSID}
								onValueChange={(printWithSSID) => onValueChange?.('printWithSSID', printWithSSID)}
							/>
						</div>
						{securityType !== 'nopass' && (
							<div className='flex items-center space-x-2'>
								<Toggle
									label='Display Password'
									id='print-password'
									checked={printWithPassword}
									onValueChange={(printWithPassword) => onValueChange?.('printWithPassword', printWithPassword)}
								/>
							</div>
						)}
					</div>
				</div>
				<div className='flex gap-2 justify-end mt-6'>
					<Button variant='outline' onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onPrint} className='flex items-center gap-2'>
						<Printer className='h-4 w-4' />
						Print {numberOfCards} Card{numberOfCards !== 1 ? 's' : ''}
					</Button>
				</div>
			</div>
		</Modal>
	)
}
