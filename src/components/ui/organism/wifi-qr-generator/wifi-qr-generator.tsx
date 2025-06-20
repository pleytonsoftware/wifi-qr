import { Card } from '@atoms/card'
import { Instructions } from '@molecules/instructions/instructions'
import { WiFiConfigForm } from '@molecules/wifi-config-form'
import { WiFiQRCodeDisplay } from '@molecules/wifi-qr-code-display'
import { WiFiStringCopy } from '@molecules/wifi-string-copy/wifi-string-copy'
import { Wifi } from 'lucide-react'
import { useRef } from 'react'

export const WiFiQRGenerator = () => {
	const yearRef = useRef(new Date().getFullYear())

	return (
		<div className='min-h-screen bg-base-100 flex flex-col justify-center p-4'>
			<div className='max-w-4xl mx-auto flex flex-col space-y-6'>
				<div className='text-center mb-8'>
					<div className='flex items-center justify-center gap-2 mb-4'>
						<Wifi className='h-8 w-8 text-primary' />
						<h1 className='text-3xl font-bold text-base-content'>Wi-Fi QR Generator</h1>
					</div>
					<p className='text-base-content-secondary'>Generate QR codes for easy Wi-Fi sharing</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6'>
					<Card>
						<Card.Body className='space-y-2'>
							<Card.Title>Wi-Fi Configuration</Card.Title>
							<Card.Description>Enter your Wi-Fi details to generate a QR code</Card.Description>
							<WiFiConfigForm />
							<div className='pt-4 space-y-2'>
								<WiFiStringCopy />
							</div>
						</Card.Body>
					</Card>
					<Card>
						<Card.Body className='space-y-2'>
							<Card.Title>Generated QR Code</Card.Title>
							<Card.Description>Scan this code to connect to the Wi-Fi network</Card.Description>
							<WiFiQRCodeDisplay />
						</Card.Body>
					</Card>
				</div>
				<Instructions />
			</div>

			<footer className='mt-8 text-center text-sm text-base-content-secondary'>
				<p>
					Created by
					<a href='https://pleyt.dev' target='_blank' rel='noopener noreferrer' className='btn btn-link btn-xs'>
						pleyt.dev
					</a>
					&copy; {yearRef.current}
				</p>
			</footer>
		</div>
	)
}
