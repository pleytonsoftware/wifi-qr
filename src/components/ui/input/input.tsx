import type { ButtonProps } from '@ui/button'
import type { InputHTMLAttributes, FC, ReactNode, ComponentType } from 'react'

import { cn } from '@cn'

type InputColour = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type InputVariant = 'default' | 'ghost'
type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	colour?: InputColour
	variant?: InputVariant
	inputSize?: InputSize
	icon?: ReactNode
	label?: ReactNode
	legend?: ReactNode
	labelPlacement?: 'left' | 'right' // for positioning label relative to input
	rightElement?: ReactNode // for kbd, badge, etc.
	containerClassName?: string
	Button?: ComponentType<ButtonProps>
	buttonProps?: ButtonProps
}

const colours: Record<InputColour, string | null> = {
	primary: 'input-primary',
	secondary: 'input-secondary',
	accent: 'input-accent',
	info: 'input-info',
	success: 'input-success',
	warning: 'input-warning',
	error: 'input-error',
}

const variants: Record<InputVariant, string | null> = {
	default: null,
	ghost: 'input-ghost',
}

const sizes: Record<InputSize, string | null> = {
	xs: 'input-xs',
	sm: 'input-sm',
	md: null,
	lg: 'input-lg',
	xl: 'input-xl',
}

export const Input: FC<InputProps> = ({
	colour = 'primary',
	variant = 'default',
	inputSize = 'md',
	icon,
	label,
	rightElement,
	className,
	containerClassName,
	labelPlacement = 'left', // default label placement
	legend: legendNode,
	Button: ButtonComponent,
	buttonProps: { className: buttonClassName, ...buttonProps } = {},
	...props
}) => {
	const labelNode = label && <span className='label max-w-1/3 truncate'>{label}</span>
	let input = (
		<label
			className={cn('input w-full', ButtonComponent && 'join-item', variants[variant], colours[colour], sizes[inputSize], containerClassName)}
		>
			{labelNode && labelPlacement === 'left' && labelNode}
			{icon && <span className='mr-2 flex items-center'>{icon}</span>}
			<input className={cn('grow', className)} {...props} />
			{labelNode && labelPlacement === 'right' && labelNode}
			{rightElement && <span className='ml-2 flex items-center'>{rightElement}</span>}
		</label>
	)

	if (legendNode) {
		input = (
			<fieldset className={cn('fieldset', containerClassName)}>
				{legendNode && <legend className='fieldset-legend'>{legendNode}</legend>}
				{input}
				{labelNode}
			</fieldset>
		)
	}

	if (ButtonComponent) {
		return (
			<div className={cn('join w-full', containerClassName)}>
				{input}
				<ButtonComponent className={cn('join-item', legendNode && 'bottom-0', buttonClassName)} {...buttonProps} />
			</div>
		)
	}

	return input
}
