import { Button } from '@ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { Select } from '@ui/select'
import { Wifi, Download, Copy, Check } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

import { useToast } from '@/components/hooks/use-toast.hook'

const WiFiQRGenerator = () => {
	const [ssid, setSsid] = useState('')
	const [password, setPassword] = useState('')
	const [securityType, setSecurityType] = useState('WPA')
	const [copied, setCopied] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { showToast: toast } = useToast()

	// Generate QR code whenever inputs change
	useEffect(() => {
		generateQRCode()
	}, [ssid, password, securityType])

	const generateQRCode = async () => {
		if (!ssid.trim()) return

		const canvas = canvasRef.current
		if (!canvas) return

		try {
			// Dynamic import of qrcode
			const QRCode = (await import('qrcode')).default

			// Wi-Fi QR code format: WIFI:T:<security>;S:<SSID>;P:<password>;H:<hidden>;;
			const wifiString = `WIFI:T:${securityType};S:${ssid};P:${securityType === 'nopass' ? '' : password};H:false;;`

			// Clear canvas
			const ctx = canvas.getContext('2d')
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height)
			}

			// Generate QR code
			await QRCode.toCanvas(canvas, wifiString, {
				width: 256,
				margin: 2,
				color: {
					dark: '#000000',
					light: '#FFFFFF',
				},
			})
		} catch (error) {
			console.error('Error generating QR code:', error)
		}
	}

	const downloadQRCode = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const link = document.createElement('a')
		link.download = `wifi-${ssid || 'qr-code'}.png`
		link.href = canvas.toDataURL()
		link.click()

		toast({
			title: 'QR Code Downloaded',
			description: 'The Wi-Fi QR code has been saved to your device.',
		})
	}

	const copyWiFiString = async () => {
		const wifiString = `WIFI:T:${securityType};S:${ssid};P:${securityType === 'nopass' ? '' : password};H:false;;`

		try {
			await navigator.clipboard.writeText(wifiString)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)

			toast({
				title: 'Copied to Clipboard',
				description: 'Wi-Fi configuration string copied successfully.',
			})
		} catch (error) {
			toast({
				title: 'Copy Failed',
				description: 'Unable to copy to clipboard.',
				variant: 'destructive',
			})
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-8'>
					<div className='flex items-center justify-center gap-2 mb-4'>
						<Wifi className='h-8 w-8 text-blue-600' />
						<h1 className='text-3xl font-bold text-gray-900'>Wi-Fi QR Generator</h1>
					</div>
					<p className='text-gray-600'>Generate QR codes for easy Wi-Fi sharing</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* Configuration Panel */}
					<Card>
						<CardHeader>
							<CardTitle>Wi-Fi Configuration</CardTitle>
							<CardDescription>Enter your Wi-Fi details to generate a QR code</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='ssid'>Network Name (SSID)</Label>
								<Input id='ssid' placeholder='Enter Wi-Fi network name' value={ssid} onChange={(e) => setSsid(e.target.value)} />
							</div>

							<div className='space-y-2'>
								<Label htmlFor='security'>Security Type</Label>
								<Select value={securityType} onValueChange={setSecurityType}>
									<SelectTrigger>
										<SelectValue placeholder='Select security type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='WPA'>WPA/WPA2</SelectItem>
										<SelectItem value='WEP'>WEP</SelectItem>
										<SelectItem value='nopass'>No Password</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{securityType !== 'nopass' && (
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										id='password'
										type='password'
										placeholder='Enter Wi-Fi password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							)}

							<div className='pt-4 space-y-2'>
								<Label className='text-sm font-medium'>Wi-Fi Configuration String</Label>
								<div className='flex items-center gap-2'>
									<Input
										readOnly
										value={`WIFI:T:${securityType};S:${ssid};P:${securityType === 'nopass' ? '' : password};H:false;;`}
										className='font-mono text-xs'
									/>
									<Button colour='outline' size='icon' onClick={copyWiFiString} disabled={!ssid.trim()}>
										{copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* QR Code Display */}
					<Card>
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
					</Card>
				</div>

				{/* Instructions */}
				<Card className='mt-6'>
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
				</Card>
			</div>
		</div>
	)
}
