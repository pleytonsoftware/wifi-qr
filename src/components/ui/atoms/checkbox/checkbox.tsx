import type { InputHTMLAttributes, FC } from 'react'

import { cn } from '@cn'

type CheckboxColour = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'
type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	colour?: CheckboxColour
	inputSize?: CheckboxSize
	label?: string
	labelClassName?: string
	containerClassName?: string
	onValueChange?: (checked: boolean) => void
	indeterminate?: boolean
	fieldset?: boolean
}

const colours: Record<CheckboxColour, string> = {
	primary: 'checkbox-primary',
	secondary: 'checkbox-secondary',
	accent: 'checkbox-accent',
	neutral: 'checkbox-neutral',
	success: 'checkbox-success',
	warning: 'checkbox-warning',
	info: 'checkbox-info',
	error: 'checkbox-error',
}

const sizes: Record<CheckboxSize, string> = {
	xs: 'checkbox-xs',
	sm: 'checkbox-sm',
	md: 'checkbox-md',
	lg: 'checkbox-lg',
	xl: 'checkbox-xl',
}

export const Checkbox: FC<CheckboxProps> = ({
	colour = 'primary',
	inputSize = 'md',
	label,
	className,
	labelClassName,
	containerClassName,
	onValueChange,
	indeterminate,
	fieldset,
	...props
}) => {
	const inputRef = (el: HTMLInputElement | null) => {
		if (el && typeof indeterminate === 'boolean') {
			el.indeterminate = indeterminate
		}
	}

	const checkboxInput = (
		<input
			ref={inputRef}
			type='checkbox'
			className={cn('checkbox', colours[colour], sizes[inputSize], className, props.disabled && 'checkbox-disabled')}
			onChange={(e) => {
				props.onChange?.(e)
				onValueChange?.(e.target.checked)
			}}
			{...props}
		/>
	)

	if (fieldset && label) {
		return (
			<fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4'>
				<legend className='fieldset-legend'>{label}</legend>
				<label className={cn('label', containerClassName)}>
					{checkboxInput}
					<span className={cn('select-none', labelClassName)}>{props.children}</span>
				</label>
			</fieldset>
		)
	}

	return (
		<label className={cn('inline-flex items-center gap-2', containerClassName)}>
			{checkboxInput}
			{label && <span className={cn('select-none', labelClassName)}>{label}</span>}
		</label>
	)
}
