import type { FC, SelectHTMLAttributes, ReactNode, OptionHTMLAttributes } from 'react'

import { cn } from '@cn'

type SelectColour = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type SelectVariant = 'default' | 'ghost'
type SelectSize = 'xs' | 'sm' | 'md' | 'lg'

export type SelectOptionProps = OptionHTMLAttributes<HTMLOptionElement> & {
	value: string
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: ReactNode
	helperText?: ReactNode
	options?: SelectOptionProps[]
	colour?: SelectColour
	variant?: SelectVariant
	selectSize?: SelectSize
	className?: string
	selectClassName?: string
	fieldsetClassName?: string
	labelClassName?: string
	helperTextClassName?: string
	children?: ReactNode
	onValueChange?: (value: string) => void
}

const colours = {
	primary: 'select-primary',
	secondary: 'select-secondary',
	accent: 'select-accent',
	info: 'select-info',
	success: 'select-success',
	warning: 'select-warning',
	error: 'select-error',
}

const variants = {
	default: null, // Default variant, no specific class
	ghost: 'select-ghost',
}

const sizes = {
	xs: 'select-xs',
	sm: 'select-sm',
	md: null, // Default size, no specific class
	lg: 'select-lg',
}

export const Select: FC<SelectProps> & { Option: FC<SelectOptionProps> } = ({
	label,
	helperText,
	options,
	colour = 'primary',
	variant = 'default',
	selectSize = 'md',
	className,
	selectClassName,
	fieldsetClassName,
	labelClassName,
	helperTextClassName,
	children,
	onValueChange,
	onChange,
	...props
}) => (
	<fieldset className={cn('fieldset', fieldsetClassName, className)}>
		{label && <legend className={cn('fieldset-legend', labelClassName)}>{label}</legend>}
		<select
			className={cn('select w-full', colours[colour], variants[variant], sizes[selectSize], selectClassName)}
			onChange={(e) => {
				onChange?.(e)
				onValueChange?.(e.target.value)
			}}
			{...props}
		>
			{options?.map((option, i) => <Select.Option key={option.value ?? i} {...option} />) || children}
		</select>
		{helperText && <span className={cn('label', helperTextClassName)}>{helperText}</span>}
	</fieldset>
)

Select.Option = ({ label, ...option }: SelectOptionProps) => <option {...option}>{label}</option>

export const SelectOption = Select.Option
