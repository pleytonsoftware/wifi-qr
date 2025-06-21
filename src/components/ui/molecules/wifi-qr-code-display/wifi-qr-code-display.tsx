import { Button } from '@atoms/button'
import { cn } from '@cn'
import { PrintSettingsModal } from '@molecules/print-settings-modal'
import { Download, Printer, QrCode } from 'lucide-react'
import ms from 'ms'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useCallback, type FC, useRef, memo } from 'react'

import { SecurityType } from '@/constants/wifi'
import { useWiFiQRStore } from '@/store/wifi-qr.store'

const CLOSE_PRINT_TIMEOUT_MS = ms('0.5 seconds')

export const WiFiQRCodeDisplay: FC = memo(() => {
	const [open, setOpen] = useState(false)
	const [numberOfCards, setNumberOfCards] = useState<number>(1)
	const [printWithSSID, setPrintWithSSID] = useState<boolean>(true)
	const [printWithPassword, setPrintWithPassword] = useState<boolean>(false)
	const { ssid, password, securityType } = useWiFiQRStore((state) => state.wifiDetails)
	const wifiString = useWiFiQRStore((state) => state.wifiString)
	const qrRef = useRef<SVGSVGElement>(null)
	const isReadyQR =
		Boolean(ssid.trim()) &&
		(securityType === SecurityType.NO_PASS ||
			((securityType === SecurityType.WPA || securityType === SecurityType.WEP) && Boolean(password.trim())))

	const handleDownload = useCallback(async () => {
		if (!qrRef.current) return
		const { toPng } = await import('html-to-image')
		const dataUrl = await toPng(qrRef.current as unknown as HTMLElement)
		const link = document.createElement('a')
		link.href = dataUrl
		link.download = `${ssid}_wifi_qr.png`
		link.click()
	}, [ssid])

	const handlePrintOpen = useCallback(() => setOpen(true), [])
	const handlePrint = useCallback(async () => {
		if (!qrRef?.current) return
		const { toPng } = await import('html-to-image')
		const dataUrl = await toPng(qrRef.current as unknown as HTMLElement)
		const printWindow = window.open('', '_blank')

		if (printWindow) {
			const [{ renderToStaticMarkup }, { WifiQRCodePrinter }] = await Promise.all([
				import('react-dom/server'),
				import('@atoms/wifi-qr-code-printer'),
			])
			const ssidToDisplay = printWithSSID ? ssid : undefined
			const password = printWithPassword ? useWiFiQRStore.getState().wifiDetails.password : undefined

			const html = renderToStaticMarkup(
				<WifiQRCodePrinter ssid={ssidToDisplay} password={password} dataUrl={dataUrl} numberOfCards={numberOfCards} />,
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
	}, [printWithSSID, ssid, printWithPassword, numberOfCards])

	return (
		<div className='w-full h-full justify-around flex flex-col items-center self-center space-y-4'>
			<div className={cn('bg-white p-4 rounded-lg shadow-sm border aspect-square w-48')}>
				{isReadyQR ? (
					<QRCodeSVG value={wifiString} size={200} className='w-full h-full' ref={qrRef} />
				) : (
					<QrCode className='text-base-100 w-full h-full' />
				)}
			</div>
			<div className='space-y-3 justify-self-end min-h-12'>
				{isReadyQR ? (
					<>
						<div className='flex gap-2 flex-col lg:flex-row items-center justify-around'>
							<Button colour='primary' onClick={handleDownload} className='flex items-center gap-2'>
								<Download className='h-4 w-4' />
								Download QR Code
							</Button>
							<Button colour='primary' variant='outline' onClick={handlePrintOpen} className='flex items-center gap-2'>
								<Printer className='h-4 w-4' />
								Print QR Code
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
						Please enter valid Wi-Fi details to generate a QR code.
						<br />
						Ensure the SSID is provided and, if applicable, the password is set for WPA or WEP security types.
					</p>
				)}
			</div>
		</div>
	)
})
