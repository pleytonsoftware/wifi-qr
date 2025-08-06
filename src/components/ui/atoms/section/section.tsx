import type { FC, PropsWithChildren } from 'react'

import { cn } from '@cn'

type SectionProps = PropsWithChildren<{
	heightType?: 'full' | 'default'
	className?: string
}>

export const Section: FC<SectionProps> = ({ children, heightType, className }) => (
	<div className={cn('flex flex-col justify-center gap-6', heightType === 'full' && 'min-h-app -mt-4', className)}>{children}</div>
)
