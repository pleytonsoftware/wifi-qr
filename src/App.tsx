import { ToastProvider } from '@providers/toast.provider'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Select } from '@ui/select'
import { Toggle } from '@ui/toggle'
import { toPng } from 'html-to-image'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useRef } from 'react'

import { getWiFiString } from './utils/qr-generator'
import { WiFiQRGenerator } from './wifi-qr-generator/wifi-qr-generator'

type SecurityType = 'WPA' | 'WEP' | 'nopass'

function App() {
	const [ssid, setSsid] = useState('')
	const [password, setPassword] = useState('')
	const [security, setSecurity] = useState<SecurityType>('WPA')
	const qrRef = useRef<HTMLDivElement>(null)

	const handleDownload = async () => {
		if (!qrRef.current) return
		const dataUrl = await toPng(qrRef.current)
		const link = document.createElement('a')
		link.href = dataUrl
		link.download = `${ssid}_wifi_qr.png`
		link.click()
	}

	return (
		<ToastProvider>
			{/* <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
				<div className='bg-base-200 shadow-xl rounded-box p-8 w-full max-w-md space-y-6'>
					<h1 className='text-2xl font-bold text-center text-base-content'>📶 Wi-Fi QR Generator</h1>

					<div className='space-y-4'>
						<Input type='text' legend='SSID' placeholder='SSID' value={ssid} onChange={(e) => setSsid(e.target.value)} />

						{security !== 'nopass' && (
							<Input
								type='password'
								legend='Password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						)}

						<Select label='Security' className='w-full' value={security} onChange={(e) => setSecurity(e.target.value as SecurityType)}>
							<Select.Option value='WPA' label='WPA / WPA2' />
							<Select.Option value='WEP' label='WEP' />
							<Select.Option value='nopass' label='Open (no password)' />
						</Select>
						<Toggle label='Hidden Network?' />
					</div>

					{ssid && (security === 'nopass' || password) && (
						<div className='text-center'>
							<div ref={qrRef} className='inline-block p-4 bg-base-100 border rounded-box shadow'>
								<QRCodeSVG
									value={getWiFiString({
										ssid,
										password,
										security,
										hidden: false,
									})}
									size={200}
								/>
							</div>

							<Button onClick={handleDownload}>Download PNG</Button>
						</div>
					)}
				</div>
			</div> */}
			<WiFiQRGenerator />
		</ToastProvider>
	)
}

export default App
