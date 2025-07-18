/* eslint-disable @next/next/no-head-element */
import type { FC } from 'react'

import { useTranslations } from 'next-intl'

import { WifiCard } from '@atoms/wifi-card'
import { LOCALE_NAMESPACES } from '@const/languages'
import { MiniLogo } from '@molecules/mini-logo'

type WifiQRCodePrinterProps = {
	ssid?: string
	dataUrl: string
	password?: string
	numberOfCards?: number
	cssHref: string
}
export const WifiQRCodePrinter: FC<WifiQRCodePrinterProps> = ({ ssid, password, dataUrl, numberOfCards = 1, cssHref }) => {
	const t = useTranslations(LOCALE_NAMESPACES.common)

	return (
		<html>
			<head>
				<title>{`Wi-Fi QR Code - ${ssid}`}</title>
				<link rel='stylesheet' href={cssHref} />
				<style>
					{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: white;
          }
          
          .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            position: relative;
          }
          
          .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25in;
            justify-content: center;
          }
          
          .instructions {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
            font-size: 12px;
          }
          
          .page-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
          
          @media print {
            body { 
              margin: 0; 
              padding: 0.5in;
            }
            .page {
              width: 100%;
              margin: 0;
            }
          }
          
          @page {
            margin: 0.5in;
            size: letter;
          }`}
				</style>
			</head>
			<body>
				<div className='page'>
					<div className='page-title'>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
							<MiniLogo />
						</div>
						{t('wifi_config.title')}
					</div>
					<div className='instructions'>{t('qr_code_printer.instructions')}</div>
					<div className='card-container'>
						{Array.from({ length: numberOfCards }).map((_, idx) => (
							<div key={idx} style={{ paddingTop: '0.25in' }}>
								<WifiCard ssid={ssid} password={password} dataUrl={dataUrl} cutGuides />
							</div>
						))}
					</div>
				</div>
			</body>
		</html>
	)
}
