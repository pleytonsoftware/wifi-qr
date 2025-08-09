import type { WifiCard } from '@hooks/use-wifi-cards.hook'
import type { FC } from 'react'

import { useTranslations } from 'next-intl'
import { QRCodeSVG } from 'qrcode.react'

import { BackdropModal } from '@atoms/modal'
import { LOCALE_NAMESPACES } from '@const/languages'

type WifiDetailsQRDisplayModalProps = {
	selectedQRCard?: WifiCard
	onCloseModal: () => void
}

export const WifiDetailsQRDisplayModal: FC<WifiDetailsQRDisplayModalProps> = ({ selectedQRCard, onCloseModal }) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)

	return (
		<BackdropModal showBackdrop={Boolean(selectedQRCard)} onClose={onCloseModal}>
			{selectedQRCard && (
				<div className='relative max-w-dvw bg-transparent rounded-lg shadow-lg flex flex-col items-center'>
					<div
						className='flex items-center justify-center w-full'
						style={{
							width: '100%',
							maxWidth: '100%',
						}}
					>
						<div
							className='bg-white rounded-lg border border-base-300 shadow-md flex items-center justify-center'
							style={{
								width: '50vw',
								maxWidth: '400px',
								minWidth: '250px',
							}}
						>
							<QRCodeSVG value={selectedQRCard.wifiString} size={Math.min(window.innerWidth * 0.5, 350)} className='w-full h-full' />
						</div>
					</div>
					<div className='mt-4 text-center'>
						<div className='font-bold text-lg'>{selectedQRCard.ssid || t('wifi_details_table.unnamed_network')}</div>
						{selectedQRCard.accessPassword && (
							<div className='text-sm opacity-70 font-mono'>
								{t('wifi_details_table.password')}: {selectedQRCard.accessPassword}
							</div>
						)}
					</div>
				</div>
			)}
		</BackdropModal>
	)
}
