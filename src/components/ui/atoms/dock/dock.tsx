import type { FC, ReactNode, ButtonHTMLAttributes, Ref } from 'react'

import { cn } from '@cn'

type DockSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type DockColour = 'base' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

export interface DockProps {
	size?: DockSize
	colour?: DockColour
	className?: string
	children: ReactNode
}

export interface DockItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean
	icon: ReactNode
	label?: ReactNode
	className?: string
	ref?: Ref<HTMLButtonElement>
}

export type DockComponent = FC<DockProps> & { Item: FC<DockItemProps> }

const sizeClasses: Record<DockSize, string> = {
	xs: 'dock-xs',
	sm: 'dock-sm',
	md: 'dock-md',
	lg: 'dock-lg',
	xl: 'dock-xl',
}

const colourClasses: Record<DockColour, string | null> = {
	base: null,
	primary: 'text-primary',
	secondary: 'text-secondary',
	accent: 'text-accent',
	info: 'text-info',
	success: 'text-success',
	warning: 'text-warning',
	error: 'text-error',
}

export const Dock: DockComponent = ({ size = 'md', colour = 'base', className, children }) => (
	<div className={cn('dock', sizeClasses[size], colourClasses[colour], className)}>{children}</div>
)

export const DockItem: FC<DockItemProps> = ({ active, icon, label, className, ...props }) => (
	<button className={cn(active && 'dock-active', className)} {...props}>
		{icon}
		{label && <span className='dock-label'>{label}</span>}
	</button>
)

Dock.Item = DockItem
