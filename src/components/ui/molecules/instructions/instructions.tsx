import type { ParseKeys } from 'i18next'
import type { FC } from 'react'

import { Translation } from 'react-i18next'

import { Badge } from '@atoms/badge'
import { Card } from '@atoms/card'

type Step = {
	title: ParseKeys<'common'>
	description: ParseKeys<'common'>
}
const guideSteps: Array<Step> = [
	{
		title: 'steps.1.title',
		description: 'steps.1.description',
	},
	{
		title: 'steps.2.title',
		description: 'steps.2.description',
	},
	{
		title: 'steps.3.title',
		description: 'steps.3.description',
	},
]

export const Instructions: FC = () => (
	<Translation ns='common'>
		{(t) => (
			<Card>
				<Card.Body className='space-y-2'>
					<Card.Title>{t('steps.title')}</Card.Title>
					<Card.Description>{t('steps.description')}:</Card.Description>
					<div className='grid md:grid-cols-3 gap-4 text-sm'>
						{guideSteps.map((step, index) => (
							<div key={index} className='flex items-start gap-3'>
								<Badge colour='primary' rounded>
									{index + 1}
								</Badge>
								<div>
									<h4 className='font-medium mb-1'>{t(step.title)}</h4>
									<p className='text-gray-600'>{t(step.description)}</p>
								</div>
							</div>
						))}
					</div>
				</Card.Body>
			</Card>
		)}
	</Translation>
)
