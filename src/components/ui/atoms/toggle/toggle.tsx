import type { InputHTMLAttributes, FC } from 'react'

import { cn } from '@cn'

type ToggleColour = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'

type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	colour?: ToggleColour
	size?: ToggleSize
	label?: string
	labelClassName?: string
	containerClassName?: string
	onValueChange?: (checked: boolean) => void
}

const colours: Record<ToggleColour, string> = {
	primary: 'toggle-primary',
	secondary: 'toggle-secondary',
	accent: 'toggle-accent',
	neutral: 'toggle-neutral',
	success: 'toggle-success',
	warning: 'toggle-warning',
	info: 'toggle-info',
	error: 'toggle-error',
}

const sizes: Record<ToggleSize, string> = {
	xs: 'toggle-xs',
	sm: 'toggle-sm',
	md: 'toggle-md',
	lg: 'toggle-lg',
	xl: 'toggle-xl',
}

export const Toggle: FC<ToggleProps> = ({
	colour = 'primary',
	size = 'md',
	label,
	className,
	labelClassName,
	containerClassName,
	onValueChange,
	onChange,
	...props
}) => (
	<label className={cn('inline-flex items-center gap-2', containerClassName)}>
		<input
			type='checkbox'
			className={cn('toggle', colours[colour], sizes[size], className, props.disabled && 'toggle-disabled')}
			onChange={(e) => {
				onChange?.(e)
				onValueChange?.(e.target.checked)
			}}
			{...props}
		/>
		{label && <span className={cn('select-none', labelClassName)}>{label}</span>}
	</label>
)
