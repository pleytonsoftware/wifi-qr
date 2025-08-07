'use client'

import { type FC } from 'react'

import { useTranslations } from 'next-intl'

import { Card } from '@atoms/card'
import { LOCALE_NAMESPACES } from '@const/languages'
import { WiFiQRCodeDisplay } from '@molecules/wifi/wifi-qr-code-display'

export const WiFiQRCard: FC = () => {
	const t = useTranslations(LOCALE_NAMESPACES.common)

	return (
		<Card>
			<Card.Body className='space-y-2'>
				<Card.Title>{t('generated_qr.title')}</Card.Title>
				<Card.Description>{t('generated_qr.description')}</Card.Description>
				<WiFiQRCodeDisplay />
			</Card.Body>
		</Card>
	)
}
