'use client'

import { forwardRef, type FC } from 'react'

import { useTranslations } from 'next-intl'

import { Card } from '@atoms/card'
import { Divider } from '@atoms/divider'
import { LOCALE_NAMESPACES } from '@const/languages'
import { SaveWifiButton } from '@molecules/wifi/save-wifi-button'
import { WiFiConfigForm, type WiFiConfigFormRef } from '@molecules/wifi/wifi-config-form'
import { WiFiStringCopy } from '@molecules/wifi/wifi-string-copy'

interface WiFiConfigCardProps {
	onClear?: (evt: any) => void
}

export const WiFiConfigCard = forwardRef<WiFiConfigFormRef, WiFiConfigCardProps>(({ onClear }, ref) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)

	return (
		<Card>
			<Card.Body className='space-y-2'>
				<div className='flex items-center justify-between gap-2'>
					<Card.Title>{t('wifi_config.title')}</Card.Title>
					<SaveWifiButton onClear={onClear} />
				</div>
				<Card.Description>{t('wifi_config.description')}</Card.Description>
				<WiFiConfigForm ref={ref} />
				<Divider spacing='xs' />
				<div className='space-y-2'>
					<WiFiStringCopy />
				</div>
			</Card.Body>
		</Card>
	)
})

WiFiConfigCard.displayName = 'WiFiConfigCard'
