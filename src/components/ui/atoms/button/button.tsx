import type { ButtonHTMLAttributes, FC, JSX } from 'react'

import { Loading } from '@atoms/loading'
import { cn } from '@cn'

type ButtonColour = 'base' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type ButtonVariant = 'default' | 'outline' | 'soft' | 'dash' | 'ghost' | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	colour?: ButtonColour
	variant?: ButtonVariant
	size?: ButtonSize
	icon?: JSX.Element
	loading?: boolean
}

const colours: Record<ButtonColour, string | null> = {
	base: null, // Default colour, no specific class
	primary: 'btn-primary',
	secondary: 'btn-secondary',
	accent: 'btn-accent',
	info: 'btn-info',
	success: 'btn-success',
	warning: 'btn-warning',
	error: 'btn-error',
}

const variants: Record<ButtonVariant, string | null> = {
	default: null, // Default variant, no specific class
	outline: 'btn-outline',
	soft: 'btn-soft',
	dash: 'btn-dash',
	ghost: 'btn-ghost',
	link: 'btn-link',
}
const sizes: Record<ButtonSize, string | null> = {
	xs: 'btn-xs',
	sm: 'btn-sm',
	md: null, // Default size, no specific class
	lg: 'btn-lg',
	xl: 'btn-xl',
}

export const Button: FC<ButtonProps> = ({ colour = 'primary', size = 'md', variant = 'default', children, icon, loading, className, ...props }) => (
	<button
		className={cn('btn', variants[variant], colours[colour], sizes[size], icon && 'btn-square', props.disabled && 'btn-disabled', className)}
		{...props}
	>
		<>
			{loading ? <Loading /> : icon}
			{children}
		</>
	</button>
)
