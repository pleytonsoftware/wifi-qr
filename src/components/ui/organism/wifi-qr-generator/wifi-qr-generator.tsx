'use client'

import { useRef, type FC } from 'react'

import { Section } from '@atoms/section'
import { type WiFiConfigFormRef } from '@molecules/wifi/wifi-config-form'
import { WiFiFlipCard } from '@molecules/wifi/wifi-flip-card'

export const WiFiQRGenerator: FC = () => {
	const ref = useRef<WiFiConfigFormRef>(null)

	return (
		<>
			{/* // TODO modify instructions to be a stepper (without a card?) and apply https://www.npmjs.com/package/react-joyride */}
			{/* <Instructions /> */}
			<Section heightType='full'>
				<div className='grid w-full gap-6 max-w-lg mx-auto'>
					<WiFiFlipCard ref={ref} onClear={(evt) => ref.current?.clearForm(evt)} />
				</div>
			</Section>
		</>
	)
}
