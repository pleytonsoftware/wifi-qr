import type { FC } from 'react'

import { cn } from '@cn'

type LoadingType = 'loading-spinner' | 'loading-dots' | 'loading-ring' | 'loading-ball' | 'loading-bars' | 'loading-infinity'
type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type LoadingProps = {
	type?: LoadingType
	size?: LoadingSize
}

export const Loading: FC<LoadingProps> = ({ type = 'loading-spinner', size = 'md' }) => <span className={cn('loading', type, size)} />
