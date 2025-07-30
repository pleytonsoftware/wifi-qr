import type { ButtonHTMLAttributes, JSX, ElementType } from 'react'

import { cn } from '@cn'

import { Loading } from '@atoms/loading'

type ButtonColour = 'base' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'
type ButtonVariant = 'default' | 'outline' | 'soft' | 'dash' | 'ghost' | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonShape = 'none' | 'square' | 'wide' | 'block' | 'circle'
export type ButtonProps<E extends ElementType = 'button'> = ButtonHTMLAttributes<E extends 'button' ? HTMLButtonElement : HTMLElement> & {
	colour?: ButtonColour
	variant?: ButtonVariant
	size?: ButtonSize
	icon?: JSX.Element
	loading?: boolean
	shape?: ButtonShape
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
	neutral: 'btn-neutral',
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

const shapes: Record<ButtonShape, string | null> = {
	none: null,
	square: 'btn-square',
	wide: 'btn-wide',
	block: 'btn-block',
	circle: 'btn-circle',
}

export function createBtnStyles({
	colour = 'primary',
	variant = 'default',
	size = 'md',
	shape = 'none',

	icon,
	disabled,
}: Pick<ButtonProps, 'colour' | 'variant' | 'size' | 'disabled' | 'shape'> & { icon?: boolean }): string {
	return cn('btn', colours[colour], variants[variant], sizes[size], shapes[shape], icon && 'btn-square', disabled && 'btn-disabled')
}

export const Button = <E extends ElementType = 'button'>({
	colour = 'primary',
	size = 'md',
	variant = 'default',
	shape = 'none',
	children,
	icon,
	loading,
	className,
	as: Component = 'button',
	role,
	...props
}: ButtonProps<E>) => (
	<Component
		className={cn(createBtnStyles({ colour, variant, size, shape, icon: Boolean(icon), disabled: props.disabled }), className)}
		role={role}
		{...props}
	>
		<>
			{loading ? <Loading /> : icon}
			{children}
		</>
	</Component>
)
