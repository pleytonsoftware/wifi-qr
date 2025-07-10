import type { FC, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@cn'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode
	direction?: 'vertical' | 'horizontal'
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'
	placement?: 'start' | 'end'
	spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const colorClasses: Record<NonNullable<DividerProps['color']>, string> = {
	primary: 'divider-primary',
	secondary: 'divider-secondary',
	accent: 'divider-accent',
	info: 'divider-info',
	success: 'divider-success',
	warning: 'divider-warning',
	error: 'divider-error',
	neutral: 'divider-neutral',
}

const directionClasses: Record<NonNullable<DividerProps['direction']>, string> = {
	vertical: 'divider-vertical',
	horizontal: 'divider-horizontal',
}

const placementClasses: Record<NonNullable<DividerProps['placement']>, string> = {
	start: 'divider-start',
	end: 'divider-end',
}

const spacingClasses: Record<NonNullable<DividerProps['spacing']>, string> = {
	xs: 'divider-xs',
	sm: 'divider-sm',
	md: 'divider-md',
	lg: 'divider-lg',
	xl: '',
}

export const Divider: FC<DividerProps> = ({ children, className, direction = 'vertical', color, placement, spacing = 'md', ...props }) => (
	<div
		className={cn(
			'divider',
			direction && directionClasses[direction],
			color && colorClasses[color],
			placement && placementClasses[placement],
			spacing && spacingClasses[spacing],
			className,
		)}
		{...props}
	>
		{children}
	</div>
)
