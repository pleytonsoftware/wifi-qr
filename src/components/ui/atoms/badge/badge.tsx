import type { FC, ReactNode, HTMLAttributes } from 'react'

import { cn } from '@cn'

type BadgeColour = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

type BadgeVariant = 'default' | 'soft' | 'outline' | 'dash' | 'ghost'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
	colour?: BadgeColour
	variant?: BadgeVariant
	size?: BadgeSize
	rounded?: boolean
	children: ReactNode
	className?: string
}

const colourClasses: Record<BadgeColour, string> = {
	neutral: 'badge-neutral',
	primary: 'badge-primary',
	secondary: 'badge-secondary',
	accent: 'badge-accent',
	info: 'badge-info',
	success: 'badge-success',
	warning: 'badge-warning',
	error: 'badge-error',
}

const variantClasses: Record<BadgeVariant, string | null> = {
	default: null,
	soft: 'badge-soft',
	outline: 'badge-outline',
	dash: 'badge-dash',
	ghost: 'badge-ghost',
}

const sizeClasses: Record<BadgeSize, string | null> = {
	xs: 'badge-xs',
	sm: 'badge-sm',
	md: 'badge-md',
	lg: 'badge-lg',
	xl: 'badge-xl',
}

export const Badge: FC<BadgeProps> = ({ colour = 'primary', variant = 'default', size = 'md', rounded = false, children, className, ...props }) => (
	<div
		className={cn(
			'badge',
			colourClasses[colour],
			variantClasses[variant],
			sizeClasses[size],
			rounded && 'rounded-full w-[var(--size)] h-[var(--size)]',
			className,
		)}
		{...props}
	>
		{children}
	</div>
)
