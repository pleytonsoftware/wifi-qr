import { Button } from '@atoms/button'
import { Checkbox } from '@atoms/checkbox'
import { cn } from '@cn'
import { Download, Printer } from 'lucide-react'
import ms from 'ms'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useCallback, type FC, useRef, memo } from 'react'

import { useWiFiQRStore } from '@/store/wifi-qr.store'

const CLOSE_PRINT_TIMEOUT_MS = ms('0.5 seconds')

export const WiFiQRCodeDisplay: FC = memo(() => {
	const ssid = useWiFiQRStore((state) => state.wifiDetails.ssid)
	const wifiString = useWiFiQRStore((state) => state.wifiString)
	const qrRef = useRef<SVGSVGElement>(null)
	const [printWithSSID, setPrintWithSSID] = useState<boolean>(true)
	const hasSSID = Boolean(ssid.trim())

	const handleDownload = useCallback(async () => {
		if (!qrRef.current) return
		const { toPng } = await import('html-to-image')
		const dataUrl = await toPng(qrRef.current as unknown as HTMLElement)
		const link = document.createElement('a')
		link.href = dataUrl
		link.download = `${ssid}_wifi_qr.png`
		link.click()
	}, [ssid])

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

			const html = renderToStaticMarkup(<WifiQRCodePrinter ssid={printWithSSID ? ssid : undefined} dataUrl={dataUrl} />)
			printWindow.document.writeln(html)
			printWindow.document.close()
			printWindow.focus()

			setTimeout(() => {
				printWindow.print()
				// printWindow.close()
			}, CLOSE_PRINT_TIMEOUT_MS)
		}
	}, [printWithSSID, ssid])

	return (
		<div className='w-full h-full justify-center flex flex-col items-center self-center space-y-4'>
			<div className={cn('bg-white p-4 rounded-lg shadow-sm border', !hasSSID && 'hidden')}>
				{hasSSID && <QRCodeSVG value={wifiString} size={200} ref={qrRef} />}
			</div>
			<div className='space-y-3 justify-self-end'>
				{hasSSID ? (
					<>
						<div className='flex gap-2'>
							<Button colour='primary' onClick={handleDownload} className='flex items-center gap-2'>
								<Download className='h-4 w-4' />
								Download QR Code
							</Button>
							<Button colour='primary' variant='outline' onClick={handlePrint} className='flex items-center gap-2'>
								<Printer className='h-4 w-4' />
								Print QR Code
							</Button>
						</div>

						<div className='flex items-center space-x-2'>
							<Checkbox
								id='print-ssid'
								label='Include network name when printing'
								checked={printWithSSID}
								onValueChange={setPrintWithSSID}
							/>
						</div>
					</>
				) : (
					<p className='text-sm text-gray-500 text-center'>Enter a network name to generate QR code</p>
				)}
			</div>
		</div>
	)
})
