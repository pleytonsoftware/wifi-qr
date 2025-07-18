import type { FC } from 'react'

import { useTranslations } from 'next-intl'

import { Card } from '@atoms/card'
import { Divider } from '@atoms/divider'
import { LOCALE_NAMESPACES } from '@const/languages'
import { WiFiConfigForm } from '@molecules/wifi-config-form'
import { WiFiQRCodeDisplay } from '@molecules/wifi-qr-code-display'
import { WiFiStringCopy } from '@molecules/wifi-string-copy'

export const WiFiQRGenerator: FC = () => {
	const t = useTranslations(LOCALE_NAMESPACES.common)

	return (
		<>
			{/* // TODO modify instructions to be a stepper (without a card?) and apply https://www.npmjs.com/package/react-joyride */}
			{/* <Instructions /> */}
			<div className='grid md:grid-cols-2 gap-6'>
				<Card>
					<Card.Body className='space-y-2'>
						<Card.Title>{t('wifi_config.title')}</Card.Title>
						<Card.Description>{t('wifi_config.description')}</Card.Description>
						<WiFiConfigForm />
						<Divider spacing='xs' />
						<div className='space-y-2'>
							<WiFiStringCopy />
						</div>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body className='space-y-2'>
						<Card.Title>{t('generated_qr.title')}</Card.Title>
						<Card.Description>{t('generated_qr.description')}</Card.Description>
						<WiFiQRCodeDisplay />
					</Card.Body>
				</Card>
			</div>
		</>
	)
}
