import { Card } from '@atoms/card'
import { Divider } from '@atoms/divider'
import { Instructions } from '@molecules/instructions/instructions'
import { LanguageSelector } from '@molecules/language-selector'
import { ThemeToggler } from '@molecules/theme-toggler'
import { WiFiConfigForm } from '@molecules/wifi-config-form'
import { WiFiQRCodeDisplay } from '@molecules/wifi-qr-code-display'
import { WiFiStringCopy } from '@molecules/wifi-string-copy'
import { Wifi } from 'lucide-react'
import { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { LOCALE_NAMESPACES } from '@/constants/languages'

export const WiFiQRGenerator = () => {
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const yearRef = useRef(new Date().getFullYear())

	return (
		<div className='min-h-dvh w-full bg-base dark:bg-base-100 relative'>
			<div className='absolute inset-0 z-0 bg-wifiqr-gradient' />
			<div className='min-h-dvh bg-transparent relative'>
				<div className='min-h-dvh flex flex-col justify-center p-4'>
					<div className='max-w-4xl 3xl:max-w-7xl w-full mx-auto flex flex-col space-y-6'>
						<div className='3xl:h-[10dvh] text-center mb-8'>
							<div className='flex items-center justify-center gap-2 mb-4'>
								<Wifi className='h-8 w-8 text-primary' />
								<h1 className='text-3xl font-bold text-base-content'>{t('app.title')}</h1>
							</div>
							<p className='text-base-content-secondary'>{t('app.subtitle')}</p>
						</div>

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
						<Instructions />
						<div className='fixed bottom-4 right-4 flex items-center gap-2 z-50'>
							<LanguageSelector />
							<ThemeToggler />
						</div>
					</div>
				</div>
				<footer className='mt-8 text-center py-6 border-t border-base-200 bg-transparent'>
					<div className='text-sm text-base-content-secondary'>
						<p>
							<Trans ns={LOCALE_NAMESPACES.common} i18nKey='footer.created_by'>
								<a
									href='https://pleyt.dev'
									target='_blank'
									rel='noopener noreferrer'
									className='btn btn-link btn-xs font-medium text-base-content'
								></a>
							</Trans>
						</p>
						<p className='mt-1'>
							{t('app.title')} {t('footer.copyright', { year: yearRef.current })}
						</p>
					</div>
				</footer>
			</div>
		</div>
	)
}
