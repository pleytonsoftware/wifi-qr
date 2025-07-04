import type { ButtonHTMLAttributes, JSX, ElementType } from 'react'

import { Loading } from '@atoms/loading'
import { cn } from '@cn'

type ButtonColour = 'base' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type ButtonVariant = 'default' | 'outline' | 'soft' | 'dash' | 'ghost' | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonProps<E extends ElementType = 'button'> = ButtonHTMLAttributes<E extends 'button' ? HTMLButtonElement : HTMLElement> & {
	colour?: ButtonColour
	variant?: ButtonVariant
	size?: ButtonSize
	icon?: JSX.Element
	loading?: boolean
	as?: ElementType
	role?: HTMLElement['role']
}

const colours: Record<ButtonColour, string | null> = {
	base: null,
	primary: 'btn-primary',
	secondary: 'btn-secondary',
	accent: 'btn-accent',
	info: 'btn-info',
	success: 'btn-success',
	warning: 'btn-warning',
	error: 'btn-error',
}

const variants: Record<ButtonVariant, string | null> = {
	default: null,
	outline: 'btn-outline',
	soft: 'btn-soft',
	dash: 'btn-dash',
	ghost: 'btn-ghost',
	link: 'btn-link',
}
const sizes: Record<ButtonSize, string | null> = {
	xs: 'btn-xs',
	sm: 'btn-sm',
	md: null,
	lg: 'btn-lg',
	xl: 'btn-xl',
}

export const Button = <E extends ElementType = 'button'>({
	colour = 'primary',
	size = 'md',
	variant = 'default',
	children,
	icon,
	loading,
	className,
	as: Component = 'button',
	role,
	...props
}: ButtonProps<E>) => (
	<Component
		className={cn('btn', variants[variant], colours[colour], sizes[size], icon && 'btn-square', props.disabled && 'btn-disabled', className)}
		role={role}
		{...props}
	>
		<>
			{loading ? <Loading /> : icon}
			{children}
		</>
	</Component>
)
