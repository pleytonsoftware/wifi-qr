import { cn } from '@cn'
import { Scissors, Wifi } from 'lucide-react'
import { memo, type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { DEFAULT_LANGUAGE, LOCALE_NAMESPACES } from '@/constants/languages'
import { getUrl } from '@/utils/get-site'

type WifiCardProps = {
	ssid?: string
	dataUrl: string
	password?: string
	cutGuides?: boolean
}

export const WifiCard: FC<WifiCardProps> = memo(
	({ ssid, password, dataUrl, cutGuides }) => {
		const { t, i18n } = useTranslation(LOCALE_NAMESPACES.common)

		return (
			<div className={cn('wifi-card', cutGuides && 'cut-outline', ssid && password && 'has-password')}>
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
				<div className='qr-section'>{dataUrl && <img src={dataUrl} alt='Wi-Fi QR Code' className='qr-section__image' />}</div>
				<div className='card-footer'>
					<div className='card-footer__scan-text'>{t('qr_code_printer.scan')}</div>
					{i18n.resolvedLanguage !== DEFAULT_LANGUAGE && (
						<div className='card-footer__scan-text smaller'>
							{t('qr_code_printer.scan', {
								lng: DEFAULT_LANGUAGE,
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
