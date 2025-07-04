import { Button } from '@atoms/button'
import { cn } from '@cn'
import { PrintSettingsModal } from '@molecules/print-settings-modal'
import { Download, Printer, QrCode } from 'lucide-react'
import ms from 'ms'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useCallback, type FC, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { SecurityType } from '@/constants/wifi'
import { useWiFiQRStore } from '@/store/wifi-qr.store'

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
	const qrRef = useRef<SVGSVGElement>(null)
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
			<div className={cn('bg-white p-4 rounded-lg shadow-sm border aspect-square w-48')}>
				{isReadyQR ? (
					<QRCodeSVG value={wifiString} size={200} className='w-full h-full' ref={qrRef} />
				) : (
					<QrCode className='text-black w-full h-full' />
				)}
			</div>
			<div className='space-y-3 justify-self-end min-h-12'>
				{isReadyQR ? (
					<>
						<div className='flex gap-2 flex-col lg:flex-row items-center justify-around'>
							<Button colour='primary' onClick={handleDownload} className='flex items-center gap-2'>
								<Download className='h-4 w-4' />
								{t('qr_display.buttons.download')}
							</Button>
							<Button colour='primary' variant='outline' onClick={handlePrintOpen} className='flex items-center gap-2'>
								<Printer className='h-4 w-4' />
								{t('qr_display.buttons.print')}
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
					<p className='text-sm text-base-content-secondary text-center'>
						{t('qr_display.messages.enter_details')}
						<br />
						{t('qr_display.messages.ensure_requirements')}
					</p>
				)}
			</div>
		</div>
	)
})
