'use client'

import { useState, useCallback, type FC, useRef, memo } from 'react'

import { cn } from '@cn'

import { Download, Printer, QrCode } from 'lucide-react'
import ms from 'ms'
import { useTranslations } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { QRCodeSVG } from 'qrcode.react'
import { useBoolean } from 'usehooks-ts'
import { useShallow } from 'zustand/shallow'

import { Button } from '@atoms/button'
import { LOCALE_NAMESPACES } from '@const/languages'
import { PrintSettingsModal } from '@molecules/modals/print-settings-modal'
import { MiniLogo } from '@molecules/ui/mini-logo'
import { useWiFiQRStore } from '@store/wifi-qr.store'

import { useLanguage } from '@/components/hooks/use-language'

const CLOSE_PRINT_TIMEOUT_MS = ms('0.5 seconds')

export const WiFiQRCodeDisplay: FC = memo(function WiFiQRCodeDisplay() {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const language = useLanguage()
	const { value: openModal, setTrue: setOpenModal, setFalse: closeModal } = useBoolean(false)
	const [numberOfCards, setNumberOfCards] = useState<number>(1)
	const [printWithSSID, setPrintWithSSID] = useState<boolean>(true)
	const [printWithPassword, setPrintWithPassword] = useState<boolean>(false)
	const { ssid, wifiString, wifiDataUrl, setWifiDataUrl, isWifiValid } = useWiFiQRStore(
		useShallow((state) => ({
			ssid: state.wifiDetails.ssid,
			wifiString: state.wifiString,
			wifiDataUrl: state.wifiDataUrl,
			setWifiDataUrl: state.setWifiDataUrl,
			isWifiValid: state.isWifiValid,
		})),
	)
	const qrRef = useRef<HTMLDivElement>(null)

	const generateAndSetWifiDataUrl = useCallback(async () => {
		if (!qrRef?.current) return
		const { toPng } = await import('html-to-image')
		const dataUrl = await toPng(qrRef.current as unknown as HTMLElement)
		setWifiDataUrl(dataUrl)

		return dataUrl
	}, [qrRef, setWifiDataUrl])

	const handleDownload = useCallback(async () => {
		const dataUrl = await generateAndSetWifiDataUrl()

		if (!dataUrl) return

		const link = document.createElement('a')
		link.href = dataUrl
		link.download = `${ssid}_wifi_qr.png`
		link.click()
	}, [ssid])

	const handlePrintOpen = useCallback(async () => {
		await generateAndSetWifiDataUrl()
		setOpenModal()
	}, [])
	const handlePrint = useCallback(async () => {
		if (!wifiDataUrl) return
		const printWindow = window.open('', '_blank')
		const cssHref = (document.querySelector("link[rel='stylesheet']") as HTMLLinkElement | undefined)?.href

		if (printWindow && cssHref) {
			const [{ renderToStaticMarkup }, { WifiQRCodePrinter }, { NextIntlClientProvider }, messages] = await Promise.all([
				import('react-dom/server'),
				import('@atoms/wifi-qr-code-printer'),
				import('next-intl'),
				getMessages({
					locale: language,
				}),
			])

			const ssidToDisplay = printWithSSID ? ssid : undefined
			const password = printWithPassword ? useWiFiQRStore.getState().wifiDetails.accessPassword : undefined

			const html = renderToStaticMarkup(
				<NextIntlClientProvider locale={language} messages={messages}>
					<WifiQRCodePrinter
						cssHref={cssHref}
						ssid={ssidToDisplay}
						password={password}
						dataUrl={wifiDataUrl}
						numberOfCards={numberOfCards}
					/>
				</NextIntlClientProvider>,
			)
			printWindow.document.writeln(html)
			printWindow.document.close()
			printWindow.focus()
			closeModal()

			setTimeout(() => {
				printWindow.print()
				printWindow.close()
			}, CLOSE_PRINT_TIMEOUT_MS)
		} else {
			// eslint-disable-next-line no-console
			console.error('Failed to print.')
		}
	}, [printWithSSID, ssid, printWithPassword, numberOfCards, wifiDataUrl])

	return (
		<div className='w-full h-full justify-around flex flex-col items-center self-center space-y-4'>
			<div className={cn('bg-white rounded-lg shadow-sm border aspect-square w-full px-2 md:w-2/3 md:px-0 h-auto')}>
				{isWifiValid ? (
					<div className='relative inline-block w-full h-full p-4' ref={qrRef}>
						<QRCodeSVG value={wifiString} level='H' className='w-full h-full' />
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary bg-white rounded-lg flex items-center justify-center'>
							<MiniLogo />
						</div>
					</div>
				) : (
					<QrCode className='text-black w-full h-full' />
				)}
			</div>
			<div className='flex space-y-3 justify-self-end min-h-12 w-full px-2 lg:max-w-none'>
				{isWifiValid ? (
					<>
						<div className='flex flex-1 gap-2 flex-col lg:flex-row items-center justify-around flex-wrap'>
							<Button colour='primary' onClick={handleDownload} className='flex lg:flex-1 items-center gap-2 w-full'>
								<Download className='h-4 w-4' />
								<span className='truncate'>{t('qr_display.buttons.download')}</span>
							</Button>
							<Button colour='primary' variant='outline' onClick={handlePrintOpen} className='flex lg:flex-1 items-center gap-2 w-full'>
								<Printer className='h-4 w-4' />
								<span className='truncate'>{t('qr_display.buttons.print')}</span>
							</Button>
							<PrintSettingsModal
								open={openModal}
								onClose={closeModal}
								onPrint={handlePrint}
								numberOfCards={numberOfCards}
								printWithSSID={printWithSSID}
								printWithPassword={printWithPassword}
								onValueChange={(key, value) => {
									if (key === 'numberOfCards') {
										setNumberOfCards(value as number)
									} else if (key === 'printWithSSID') {
										setPrintWithSSID(value as boolean)
									} else if (key === 'printWithPassword') {
										setPrintWithPassword(value as boolean)
									}
								}}
							/>
						</div>
					</>
				) : (
					<span className='text-sm text-base-content-secondary text-left md:text-center'>
						<p>{t('qr_display.messages.enter_details')}</p>
						<br />
						<p>{t('qr_display.messages.ensure_requirements')}</p>
					</span>
				)}
			</div>
		</div>
	)
})
