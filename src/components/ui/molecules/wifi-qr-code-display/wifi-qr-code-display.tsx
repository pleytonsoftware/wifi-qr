import { Button } from '@atoms/button'
import { cn } from '@cn'
import { MiniLogo } from '@molecules/mini-logo'
import { PrintSettingsModal } from '@molecules/print-settings-modal'
import { useWiFiQRStore } from '@store/wifi-qr.store'
import { Download, Printer, QrCode } from 'lucide-react'
import ms from 'ms'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useCallback, type FC, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { SecurityType } from '@/constants/wifi'

const CLOSE_PRINT_TIMEOUT_MS = ms('0.5 seconds')

export const WiFiQRCodeDisplay: FC = memo(() => {
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const [open, setOpen] = useState(false)
	const [numberOfCards, setNumberOfCards] = useState<number>(1)
	const [printWithSSID, setPrintWithSSID] = useState<boolean>(true)
	const [printWithPassword, setPrintWithPassword] = useState<boolean>(false)
	const { ssid, password, securityType } = useWiFiQRStore((state) => state.wifiDetails)
	const wifiString = useWiFiQRStore((state) => state.wifiString)
	const wifiDataUrl = useWiFiQRStore((state) => state.wifiDataUrl)
	const setWifiDataUrl = useWiFiQRStore((state) => state.setWifiDataUrl)
	const qrRef = useRef<HTMLDivElement>(null)
	const isReadyQR =
		Boolean(ssid.trim()) &&
		(securityType === SecurityType.NO_PASS ||
			((securityType === SecurityType.WPA || securityType === SecurityType.WEP) && Boolean(password.trim())))

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
		setOpen(true)
	}, [])
	const handlePrint = useCallback(async () => {
		if (!wifiDataUrl) return
		const printWindow = window.open('', '_blank')

		if (printWindow) {
			const [{ renderToStaticMarkup }, { WifiQRCodePrinter }] = await Promise.all([
				import('react-dom/server'),
				import('@atoms/wifi-qr-code-printer'),
			])
			const ssidToDisplay = printWithSSID ? ssid : undefined
			const password = printWithPassword ? useWiFiQRStore.getState().wifiDetails.password : undefined

			const html = renderToStaticMarkup(
				<WifiQRCodePrinter ssid={ssidToDisplay} password={password} dataUrl={wifiDataUrl} numberOfCards={numberOfCards} />,
			)
			printWindow.document.writeln(html)
			printWindow.document.close()
			printWindow.focus()
			setOpen(false)

			setTimeout(() => {
				printWindow.print()
				printWindow.close()
			}, CLOSE_PRINT_TIMEOUT_MS)
		}
	}, [printWithSSID, ssid, printWithPassword, numberOfCards, wifiDataUrl])

	return (
		<div className='w-full h-full justify-around flex flex-col items-center self-center space-y-4'>
			<div className={cn('bg-white rounded-lg shadow-sm border aspect-square w-full px-2 md:w-2/3 md:px-0 h-auto')}>
				{isReadyQR ? (
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
				{isReadyQR ? (
					<>
						<div className='flex flex-1 gap-2 flex-col lg:flex-row items-center justify-around'>
							<Button colour='primary' onClick={handleDownload} className='flex lg:flex-1 items-center gap-2 w-full'>
								<Download className='h-4 w-4' />
								<span className='truncate'>{t('qr_display.buttons.download')}</span>
							</Button>
							<Button colour='primary' variant='outline' onClick={handlePrintOpen} className='flex lg:flex-1 items-center gap-2 w-full'>
								<Printer className='h-4 w-4' />
								<span className='truncate'>{t('qr_display.buttons.print')}</span>
							</Button>
							<PrintSettingsModal
								open={open}
								onClose={() => setOpen(false)}
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
