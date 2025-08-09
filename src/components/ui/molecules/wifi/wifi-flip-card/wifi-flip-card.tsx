'use client'

import { forwardRef, type MouseEventHandler, useCallback, useState } from 'react'

import { cn } from '@cn'

import { CornerUpLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@atoms/button'
import { Card } from '@atoms/card'
import { Divider } from '@atoms/divider'
import { Icon } from '@atoms/icon'
import { LOCALE_NAMESPACES } from '@const/languages'
import { SaveWifiButton } from '@molecules/wifi/save-wifi-button'
import { WiFiConfigForm, type WiFiConfigFormRef } from '@molecules/wifi/wifi-config-form'
import { WiFiQRCodeDisplay } from '@molecules/wifi/wifi-qr-code-display'
import { WiFiStringCopy } from '@molecules/wifi/wifi-string-copy'

import { useWiFiQRStore } from '@/store/wifi-qr.store'

interface WiFiFlipCardProps {
	onClear?: MouseEventHandler<HTMLButtonElement>
}

export const WiFiFlipCard = forwardRef<WiFiConfigFormRef, WiFiFlipCardProps>(({ onClear }, ref) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const [isFlipped, setIsFlipped] = useState(false)
	const isWifiValid = useWiFiQRStore((state) => state.isWifiValid)

	const handleShowQR = useCallback(() => {
		setIsFlipped(true)
	}, [])

	const handleBackToForm = useCallback(() => {
		setIsFlipped(false)
	}, [])

	const handleClear: MouseEventHandler<HTMLButtonElement> = useCallback(
		(evt) => {
			onClear?.(evt)
			setIsFlipped(false)
		},
		[onClear],
	)

	return (
		<div className={cn('relative w-full mx-auto transition-transform duration-700 transform-style-preserve-3d', isFlipped && '-rotate-y-180')}>
			{/* Front Face - WiFi Config */}
			<div className='relative backface-hidden'>
				<Card>
					<Card.Body className='space-y-2'>
						<div className='flex items-center justify-between gap-2'>
							<Card.Title>{t('wifi_config.title')}</Card.Title>
							<SaveWifiButton onClear={handleClear} />
						</div>
						<Card.Description>{t('wifi_config.description')}</Card.Description>
						<WiFiConfigForm ref={ref} />
						<Divider spacing='xs' />
						<WiFiStringCopy />
						<Divider spacing='xs' />
						<Button onClick={handleShowQR} className='w-full justify-between' variant='default' disabled={!isWifiValid}>
							<span className='min-w-5'>&nbsp;</span>
							{t('wifi_config.submit')} <span className='rotate-y-180 text-xs'>≪🐝</span>
						</Button>
					</Card.Body>
				</Card>
			</div>

			{/* Back Face - QR Display */}
			<div className='absolute top-0 left-0 w-full h-full backface-hidden transform rotate-y-180'>
				<Card>
					<Card.Body className='space-y-2'>
						<div className='flex items-center justify-between gap-2'>
							<Card.Title className='lg:w-3/5 truncate'>{t('generated_qr.title')}</Card.Title>
							<Button
								onClick={handleBackToForm}
								variant='outline'
								size='sm'
								title={t('generated_qr.back_config')}
								className='lg:w-2/5 max-w-xs flex-shrink-0'
							>
								<Icon IconComponent={CornerUpLeft} size='xs' className='max-w-fit w-full' />
								<span className='hidden lg:block truncate'>{t('generated_qr.back_config')}</span>
							</Button>
						</div>
						<Card.Description>{t('generated_qr.description')}</Card.Description>
						<div className='flex items-center justify-center pt-4'>
							<WiFiQRCodeDisplay />
						</div>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
})

WiFiFlipCard.displayName = 'WiFiFlipCard'
