import type { FC } from 'react'

import { Badge } from '@atoms/badge'
import { Card } from '@atoms/card'

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

export const Instructions: FC = () => (
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
)
