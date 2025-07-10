import type { ButtonProps } from '@atoms/button'

import { cn } from '@cn'
import { type InputHTMLAttributes, type FC, type ReactNode, type ComponentType, useRef, useEffect, useState } from 'react'

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
	const legendRef = useRef<HTMLLegendElement>(null)
	const [offsetLegend, setOffsetLegend] = useState<number>(() => 0)
	const labelNode = label && <span className='label max-w-full truncate'>{label}</span>
	const errorNode = error && <span className='label-text-alt text-error text-xs'>{error}</span>
	const shouldRenderSimpleLabel = labelNode && !legendNode

	useEffect(() => {
		if (ButtonComponent && legendNode && legendRef.current) {
			setOffsetLegend(legendRef.current.offsetHeight)
		}
	}, [legendNode, legendRef.current])

	let input = (
		<>
			<label
				className={cn(
					'input w-full',
					ButtonComponent && 'join-item',
					// ButtonComponent && legendNode && 'rounded-r-none',
					variants[variant],
					error ? colours.error : colours[colour],
					sizes[inputSize],
					containerClassName,
					props.readOnly && '!outline-none !ring-0 focus:!outline-none focus:!ring-0',
				)}
			>
				{shouldRenderSimpleLabel && labelPlacement === 'left' && labelNode}
				{icon && <span className='mr-2 flex items-center'>{icon}</span>}
				<input className={cn('grow', className, props.readOnly && '!outline-none !ring-0 focus:!outline-none focus:!ring-0')} {...props} />
				{shouldRenderSimpleLabel && labelPlacement === 'right' && labelNode}
				{rightElement && <span className='ml-2 flex items-center'>{rightElement}</span>}
			</label>
			{!legendNode && errorNode}
		</>
	)

	if (legendNode) {
		input = (
			<fieldset className={cn('fieldset', containerClassName)}>
				{legendNode && (
					<legend className='fieldset-legend' ref={legendRef}>
						{legendNode}
					</legend>
				)}
				{input}
				{errorNode}
				{labelNode}
			</fieldset>
		)
	}

	if (ButtonComponent) {
		return (
			<div className={cn('join w-full', containerClassName)}>
				<div className='w-full'>{input}</div>
				<ButtonComponent
					className={cn('join-item', legendNode && 'relative self-start', buttonClassName)}
					{...buttonProps}
					style={{
						...buttonProps.style,
						top: legendNode && offsetLegend ? `${offsetLegend}px` : undefined,
					}}
				/>
			</div>
		)
	}

	return input
}
