import type { FC, RefObject } from 'react'

import { Button } from '@atoms/button'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

type WiFiQRCodeDisplayProps = {
	ssid: string
	qrValue: string
	onDownload: () => void
	qrRef?: RefObject<HTMLDivElement | null>
}

export const WiFiQRCodeDisplay: FC<WiFiQRCodeDisplayProps> = ({ ssid, qrValue, onDownload, qrRef }) => {
	return (
		<div className='w-full h-full justify-center flex flex-col items-center self-center space-y-4'>
			<div className={`bg-white p-4 rounded-lg shadow-sm border${ssid.trim() ? '' : ' hidden'}`} ref={qrRef}>
				<QRCodeSVG value={qrValue} size={200} />
			</div>
			{ssid.trim() && (
				<Button colour='secondary' onClick={onDownload} className='flex items-center gap-2'>
					<Download className='h-4 w-4' />
					Download QR Code
				</Button>
			)}
			{!ssid.trim() && <p className='text-sm text-gray-500 text-center'>Enter a network name to generate QR code</p>}
		</div>
	)
}
