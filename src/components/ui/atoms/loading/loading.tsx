import type { FC } from 'react'

import { cn } from '@cn'

type LoadingType = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type LoadingProps = {
	type?: LoadingType
	size?: LoadingSize
}

const sizes: Record<LoadingSize, string | null> = {
	xs: 'loading-xs',
	sm: 'loading-sm',
	md: null,
	lg: 'loading-lg',
	xl: 'loading-xl',
}

const loadingTypes: Record<LoadingType, string> = {
	spinner: 'loading-spinner',
	dots: 'loading-dots',
	ring: 'loading-ring',
	ball: 'loading-ball',
	bars: 'loading-bars',
	infinity: 'loading-infinity',
}

export const Loading: FC<LoadingProps> = ({ type = 'spinner', size = 'md' }) => <span className={cn('loading', loadingTypes[type], sizes[size])} />
