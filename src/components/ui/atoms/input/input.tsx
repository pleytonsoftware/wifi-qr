import type { ButtonProps } from '@atoms/button'
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
	error?: string // for displaying error messages
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
	error,
	...props
}) => {
	const labelNode = label && <span className='label max-w-full truncate'>{label}</span>
	const errorNode = error && <span className='label-text-alt text-error text-xs'>{error}</span>
	const shouldRenderSimpleLabel = labelNode && !legendNode

	let input = (
		<>
			<label
				className={cn(
					'input w-full',
					ButtonComponent && 'join-item',
					variants[variant],
					error ? colours.error : colours[colour],
					sizes[inputSize],
					!legendNode && containerClassName,
					props.readOnly && '!outline-none !ring-0 focus:!outline-none focus:!ring-0 !bg-base-200/50 !text-base-content-secondary/50',
				)}
			>
				{shouldRenderSimpleLabel && labelPlacement === 'left' && labelNode}
				{icon && <span className='mr-2 rtl:ml-2 flex items-center'>{icon}</span>}
				<input
					className={cn(
						'placeholder:text-base-content-secondary/50 grow',
						className,
						props.readOnly && '!outline-none !ring-0 focus:!outline-none focus:!ring-0',
					)}
					{...props}
				/>
				{shouldRenderSimpleLabel && labelPlacement === 'right' && labelNode}
				{rightElement && <span className='ml-2 flex items-center'>{rightElement}</span>}
			</label>
			{!legendNode && !ButtonComponent && errorNode}
		</>
	)

	if (ButtonComponent) {
		input = (
			<div className='join'>
				{input}
				{ButtonComponent && (
					<ButtonComponent
						className={cn('join-item', legendNode && 'relative self-start', buttonClassName)}
						{...buttonProps}
						style={{
							...buttonProps.style,
						}}
					/>
				)}
			</div>
		)
	}
	if (legendNode) {
		input = (
			<fieldset className={cn('fieldset', containerClassName)}>
				<legend className='fieldset-legend'>{legendNode}</legend>
				{input}
				{errorNode}
				{labelNode}
			</fieldset>
		)
	}

	if (!legendNode && ButtonComponent) {
		return (
			<div className={cn('flex flex-col', containerClassName)}>
				{input}
				<span className='pt-1'>{errorNode}</span>
			</div>
		)
	}

	return input
}
