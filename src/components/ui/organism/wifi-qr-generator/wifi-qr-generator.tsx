import type { SelectOptionProps } from '@atoms/select'

import { Card } from '@atoms/card'
import { Instructions } from '@molecules/instructions/instructions'
import { WiFiConfigForm } from '@molecules/wifi-config-form'
import { WiFiQRCodeDisplay } from '@molecules/wifi-qr-code-display'
import { WiFiStringCopy } from '@molecules/wifi-string-copy/wifi-string-copy'
import { Wifi } from 'lucide-react'
import { useCallback, useState } from 'react'

import { useToast } from '@/components/hooks/use-toast.hook'
import { getWiFiString, NO_PASS_VALUE } from '@/utils/qr-generator'

const pickLabel: SelectOptionProps = { label: 'Select security type', disabled: true, value: 'pick' }
const securityOptions: SelectOptionProps[] = [
	{ value: 'WPA', label: 'WPA/WPA2/WPA3' },
	{ value: 'WEP', label: 'WEP' },
	{ value: NO_PASS_VALUE, label: 'No Password' },
]
const securityOptionsWithPick: SelectOptionProps[] = [pickLabel, ...securityOptions]

export const WiFiQRGenerator = () => {
	const [ssid, setSsid] = useState('')
	const [hiddenNetwork, setHiddenNetwork] = useState<boolean>(false)
	const [password, setPassword] = useState('')
	const [securityType, setSecurityType] = useState('WPA')

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
							<WiFiConfigForm
								ssid={ssid}
								setSsid={setSsid}
								password={password}
								setPassword={setPassword}
								securityType={securityType}
								setSecurityType={setSecurityType}
								hiddenNetwork={hiddenNetwork}
								setHiddenNetwork={setHiddenNetwork}
								securityOptions={securityOptionsWithPick}
								NO_PASS_VALUE={NO_PASS_VALUE}
							/>
							<div className='pt-4 space-y-2'>
								<WiFiStringCopy value={getWiFiString({ ssid, password, security: securityType, hidden: hiddenNetwork })} />
							</div>
						</Card.Body>
					</Card>
					<Card>
						<Card.Body className='space-y-2'>
							<Card.Title>Generated QR Code</Card.Title>
							<Card.Description>Scan this code to connect to the Wi-Fi network</Card.Description>
							<WiFiQRCodeDisplay
								ssid={ssid}
								qrValue={getWiFiString({ ssid, password, security: securityType, hidden: hiddenNetwork })}
							/>
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
					&copy; {new Date().getFullYear()}
				</p>
			</footer>
		</div>
	)
}
