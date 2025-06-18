import { cn } from '@cn'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { Input } from '@ui/input'
import { Select, type SelectOptionProps } from '@ui/select'
import { Toggle } from '@ui/toggle'
import { Wifi, Download, Copy, Check } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useRef } from 'react'

import { useToast } from '@/components/hooks/use-toast.hook'
import { getWiFiString, NO_PASS_VALUE } from '@/utils/qr-generator'

const pickLabel: SelectOptionProps = { label: 'Select security type', disabled: true, value: 'pick' }
const securityOptions: SelectOptionProps[] = [
	{ value: 'WPA', label: 'WPA/WPA2/WPA3' },
	{ value: 'WEP', label: 'WEP' },
	{ value: NO_PASS_VALUE, label: 'No Password' },
]
const securityOptionsWithPick: SelectOptionProps[] = [pickLabel, ...securityOptions]
const useSteps = [
	{
		title: 'Configure Wi-Fi',
		description: 'Enter your network name, select security type, and add password if required.',
	},
	{
		title: 'Generate QR Code',
		description: 'The QR code is automatically generated as you type your Wi-Fi details.',
	},
	{
		title: 'Share & Connect',
		description: 'Download, print or share the QR code. Others can scan it to connect instantly.',
	},
]

export const WiFiQRGenerator = () => {
	const [ssid, setSsid] = useState('')
	const [hiddenNetwork, setHiddenNetwork] = useState<boolean>(false)
	const [password, setPassword] = useState('')
	const [securityType, setSecurityType] = useState('WPA')
	const [copied, setCopied] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { showToast } = useToast()

	const copyWiFiString = async () => {
		const wifiString = getWiFiString({
			ssid,
			password,
			security: securityType,
			hidden: hiddenNetwork,
		})

		try {
			await navigator.clipboard.writeText(wifiString)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)

			showToast({
				title: 'Copied to Clipboard',
				description: 'Wi-Fi configuration string copied successfully.',
				variant: 'success',
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to copy to clipboard:', error)
			showToast({
				title: 'Copy Failed',
				description: 'Unable to copy to clipboard.',
				variant: 'error',
			})
		}
	}

	return (
		<div className='min-h-screen bg-base-100 flex justify-center p-4'>
			<div className='max-w-4xl mx-auto flex flex-col space-y-6'>
				<div className='text-center mb-8'>
					<div className='flex items-center justify-center gap-2 mb-4'>
						<Wifi className='h-8 w-8 text-primary' />
						<h1 className='text-3xl font-bold text-base-content'>Wi-Fi QR Generator</h1>
					</div>
					<p className='text-base-content-secondary'>Generate QR codes for easy Wi-Fi sharing</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* Configuration Panel */}
					<Card>
						<Card.Body className='space-y-2'>
							<Card.Title>Wi-Fi Configuration</Card.Title>
							<Card.Description>Enter your Wi-Fi details to generate a QR code</Card.Description>
							<Input
								legend='Network Name (SSID)'
								id='ssid'
								placeholder='Enter Wi-Fi network name'
								value={ssid}
								icon={<Wifi className='h-4 w-4' />}
								onChange={(e) => setSsid(e.target.value)}
							/>
							<div className='space-y-2'>
								<Select
									label='Security Type'
									defaultValue={securityOptions[0].value}
									onValueChange={setSecurityType}
									options={securityOptionsWithPick}
								/>
							</div>
							{securityType !== NO_PASS_VALUE && (
								<Input
									legend='Password'
									id='password'
									type='password'
									placeholder='Enter Wi-Fi password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							)}
							<Toggle label='Hidden Network?' onValueChange={setHiddenNetwork} />
							<div className='pt-4 space-y-2'>
								<Input
									readOnly
									value={getWiFiString({
										ssid,
										password,
										security: securityType,
										hidden: hiddenNetwork,
									})}
									className='font-mono text-xs'
									Button={Button}
									buttonProps={{
										icon: copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />,
										onClick: copyWiFiString,
										// () => {
										// const wifiString = getWiFiString({
										// 	ssid,
										// 	password,
										// 	security: securityType,
										// 	hidden: hiddenNetwork,
										// })
										// navigator.clipboard
										// 	.writeText(wifiString)
										// 	.then(() => {
										// 		showToast({
										// 			title: 'Copied to Clipboard',
										// 			description: 'Wi-Fi configuration string copied successfully.',
										// 		})
										// 	})
										// 	.catch(() => {
										// 		showToast({
										// 			title: 'Copy Failed',
										// 			description: 'Unable to copy to clipboard.',
										// 			variant: 'error',
										// 		})
										// 	})
										// },
									}}
								/>
							</div>
						</Card.Body>
					</Card>

					{/* QR Code Display */}
					<Card>
						<Card.Body className='space-y-2'>
							<Card.Title>Generated QR Code</Card.Title>
							<Card.Description>Scan this code to connect to the Wi-Fi network</Card.Description>
							<div className='w-full h-full justify-center flex flex-col items-center self-center space-y-4'>
								<div className={cn('bg-white p-4 rounded-lg shadow-sm border', ssid.trim() ? '' : 'hidden')}>
									<QRCodeSVG
										value={getWiFiString({
											ssid,
											password,
											security: securityType,
											hidden: false,
										})}
										size={200}
									/>
								</div>

								{ssid.trim() && (
									<Button
										colour='secondary'
										onClick={() => {
											const canvas = canvasRef.current
											if (canvas) {
												const link = document.createElement('a')
												link.download = `${ssid}_wifi_qr.png`
												link.href = canvas.toDataURL()
												link.click()
											}
										}}
										className='flex items-center gap-2'
									>
										<Download className='h-4 w-4' />
										Download QR Code
									</Button>
								)}

								{!ssid.trim() && <p className='text-sm text-gray-500 text-center'>Enter a network name to generate QR code</p>}
							</div>
						</Card.Body>
					</Card>
					{/* <Card>
						<CardHeader>
							<CardTitle>Generated QR Code</CardTitle>
							<CardDescription>Scan this code to connect to the Wi-Fi network</CardDescription>
						</CardHeader>
						<CardContent className='flex flex-col items-center space-y-4'>
							<div className='bg-white p-4 rounded-lg shadow-sm border'>
								<canvas ref={canvasRef} width={256} height={256} className='max-w-full h-auto' />
							</div>

							{ssid.trim() && (
								<div className='flex gap-2'>
									<Button onClick={downloadQRCode} className='flex items-center gap-2'>
										<Download className='h-4 w-4' />
										Download QR Code
									</Button>
								</div>
							)}

							{!ssid.trim() && <p className='text-sm text-gray-500 text-center'>Enter a network name to generate QR code</p>}
						</CardContent>
					</Card> */}
				</div>

				{/* Instructions */}
				<Card>
					<Card.Body className='space-y-2'>
						<Card.Title>How to Use</Card.Title>
						<Card.Description>Follow these steps to generate and share your Wi-Fi QR code:</Card.Description>
						<div className='grid md:grid-cols-3 gap-4 text-sm'>
							{useSteps.map((step, index) => (
								<div key={index} className='flex items-start gap-3'>
									<Badge colour='primary' rounded>
										{index + 1}
									</Badge>
									<div>
										<h4 className='font-medium mb-1'>{step.title}</h4>
										<p className='text-gray-600'>{step.description}</p>
									</div>
								</div>
							))}
						</div>
					</Card.Body>
				</Card>
				{/* <Card className='mt-6'>
					<CardHeader>
						<CardTitle>How to Use</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid md:grid-cols-3 gap-4 text-sm'>
							<div className='flex items-start gap-3'>
								<div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs'>
									1
								</div>
								<div>
									<h4 className='font-medium mb-1'>Configure Wi-Fi</h4>
									<p className='text-gray-600'>Enter your network name, select security type, and add password if required.</p>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs'>
									2
								</div>
								<div>
									<h4 className='font-medium mb-1'>Generate QR Code</h4>
									<p className='text-gray-600'>The QR code is automatically generated as you type your Wi-Fi details.</p>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs'>
									3
								</div>
								<div>
									<h4 className='font-medium mb-1'>Share & Connect</h4>
									<p className='text-gray-600'>Download or share the QR code. Others can scan it to connect instantly.</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card> */}
			</div>
		</div>
	)
}
