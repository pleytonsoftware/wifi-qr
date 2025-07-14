import type { FC, ReactNode, InputHTMLAttributes } from 'react'

import { cn } from '@cn'

type SwapEffect = 'rotate' | 'flip'

type SwapProps = InputHTMLAttributes<HTMLInputElement> & {
	onElement: ReactNode
	offElement: ReactNode
	indeterminateElement?: ReactNode
	effect?: SwapEffect
	active?: boolean
	containerClassName?: string
	onValueChange?: (checked: boolean) => void
}

const effects: Record<SwapEffect, string> = {
	rotate: 'swap-rotate',
	flip: 'swap-flip',
}

export const Swap: FC<SwapProps> = ({
	onElement,
	offElement,
	indeterminateElement,
	effect,
	active,
	containerClassName,
	onValueChange,
	className,
	...props
}) => (
	<label className={cn('swap', effect && effects[effect], active && 'swap-active', containerClassName)}>
		<input
			type='checkbox'
			className={className}
			{...(typeof active === 'boolean' ? { checked: active } : {})}
			onChange={(e) => {
				props.onChange?.(e)
				onValueChange?.(e.target.checked)
			}}
			{...props}
		/>
		<div className='swap-on'>{onElement}</div>
		<div className='swap-off'>{offElement}</div>
		{indeterminateElement && <div className='swap-indeterminate'>{indeterminateElement}</div>}
	</label>
)
