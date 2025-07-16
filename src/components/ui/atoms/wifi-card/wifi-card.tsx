import { memo, type FC } from 'react'

import { Scissors, Wifi } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { DEFAULT_LANGUAGE, LOCALE_NAMESPACES } from '@/constants/languages'
import { getUrl } from '@/utils/get-site'
import { cn } from '@cn'
import { useLanguage } from '@hooks/use-language'

type WifiCardProps = {
	ssid?: string
	dataUrl: string
	password?: string
	cutGuides?: boolean
	shadow?: boolean
}

export const WifiCard: FC<WifiCardProps> = memo(
	function WifiCard({ ssid, password, dataUrl, cutGuides, shadow = false }) {
		const t = useTranslations(LOCALE_NAMESPACES.common)
		const language = useLanguage()

		return (
			<div className={cn('wifi-card', cutGuides && 'cut-outline', ssid && password && 'has-password', shadow && 'shadow-md')}>
				{cutGuides && (
					<div className='cut-guides'>
						<Scissors className='scissors' />
					</div>
				)}
				{(ssid || password) && (
					<div className='card-header'>
						{ssid && (
							<div className='card-header__name'>
								<Wifi className='card-header__icon' style={{ display: 'inline' }} />
								<div className='card-header__network-name'>{ssid}</div>
							</div>
						)}
						{password && <div className='card-header__network-password'>{password}</div>}
					</div>
				)}
				<div className='qr-section'>
					{dataUrl && (
						<Image
							src={dataUrl}
							alt='Wi-Fi QR Code'
							className='qr-section__image'
							width={200}
							height={200}
							sizes='(max-width: 400px) 100vw, 200px'
							priority
						/>
					)}
				</div>
				<div className='card-footer'>
					<div className='card-footer__scan-text'>{t('qr_code_printer.scan')}</div>
					{language !== DEFAULT_LANGUAGE && (
						<div className='card-footer__scan-text smaller'>
							{t('qr_code_printer.scan', {
								locale: DEFAULT_LANGUAGE,
							})}
						</div>
					)}
					<span className='card-footer__scan-text smaller'>{getUrl()}</span>
				</div>
			</div>
		)
	},
	(prevProps, nextProps) =>
		prevProps.ssid === nextProps.ssid &&
		prevProps.password === nextProps.password &&
		prevProps.dataUrl === nextProps.dataUrl &&
		prevProps.cutGuides === nextProps.cutGuides,
)
