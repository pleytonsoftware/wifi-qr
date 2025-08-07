'use client'

import { useRef, type FC } from 'react'

import { Section } from '@atoms/section'
import { WiFiConfigCard } from '@molecules/wifi-config-card'
import { type WiFiConfigFormRef } from '@molecules/wifi-config-form'
import { WiFiQRCard } from '@molecules/wifi-qr-card'

export const WiFiQRGenerator: FC = () => {
	const ref = useRef<WiFiConfigFormRef>(null)

	return (
		<>
			{/* // TODO modify instructions to be a stepper (without a card?) and apply https://www.npmjs.com/package/react-joyride */}
			{/* <Instructions /> */}
			<Section heightType='full'>
				<div className='grid md:grid-cols-2 gap-6'>
					<WiFiConfigCard ref={ref} onClear={(evt) => ref.current?.clearForm(evt)} />
					<WiFiQRCard />
				</div>
			</Section>
		</>
	)
}
