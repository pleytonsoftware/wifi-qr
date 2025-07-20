import { type FC, type ReactNode, type HTMLAttributes, useMemo } from 'react'

import { cn } from '@cn'

import { Button, type ButtonProps } from '@atoms/button'

type DropdownHorizontal = 'center' | 'end' | 'left' | 'right' | 'start'
type DropdownVertical = 'top' | 'bottom'
type DropdownModifier = 'hover' | 'open'

type DropdownProps = HTMLAttributes<HTMLDetailsElement> & {
	buttonContent: ReactNode
	children: ReactNode
	horizontal?: DropdownHorizontal
	vertical?: DropdownVertical
	openOn?: DropdownModifier[]
	menuClassName?: string
	buttonClassName?: string
	menuProps?: HTMLAttributes<HTMLUListElement>
	buttonProps?: ButtonProps
	ariaLabel?: string
}

type DropdownItemProps = HTMLAttributes<HTMLLIElement> & {
	children: ReactNode
	className?: string
	selected?: boolean // Optional prop to indicate if the item is selected
}

type DropdownComponent = FC<DropdownProps> & {
	Item: FC<DropdownItemProps>
}

const horizontalClassMap: Record<DropdownHorizontal, string> = {
	center: 'dropdown-center',
	end: 'dropdown-end rtl:dropdown-start',
	start: 'dropdown-start rtl:dropdown-end',
	left: 'dropdown-left rtl:dropdown-right',
	right: 'dropdown-right rtl:dropdown-left',
}

const verticalClassMap: Record<DropdownVertical, string> = {
	top: 'dropdown-top',
	bottom: 'dropdown-bottom',
}
const modifierClassMap: Record<DropdownModifier, string> = {
	hover: 'dropdown-hover',
	open: 'dropdown-open',
}

export const Dropdown: DropdownComponent = ({
	buttonContent,
	children,
	horizontal,
	vertical,
	openOn = [],
	buttonClassName,
	menuClassName,
	buttonProps,
	menuProps,
	ariaLabel = 'Dropdown menu',
	className,
	...props
}) => {
	const modifierClassNames = useMemo(() => openOn.map((m) => modifierClassMap[m]), [openOn])

	return (
		<details
			className={cn(
				'dropdown',
				horizontal && horizontalClassMap[horizontal],
				vertical && verticalClassMap[vertical],
				modifierClassNames,
				className,
			)}
			{...props}
		>
			<Button as='summary' role='button' colour='base' className={cn('m-1', buttonClassName)} aria-label={ariaLabel} {...buttonProps}>
				{buttonContent}
			</Button>
			<ul
				className={cn('menu dropdown-content shadow-sm rounded-box w-52 bg-base-300', menuClassName)}
				tabIndex={0}
				role='menu'
				aria-label={ariaLabel}
				{...menuProps}
			>
				{children}
			</ul>
		</details>
	)
}

export const DropdownItem: FC<DropdownItemProps> = ({ children, className, selected, ...props }) => (
	<li className={cn('rounded-box [&>*]:rounded-box', selected && 'bg-base-100', className)} {...props}>
		{children}
	</li>
)

Dropdown.Item = DropdownItem
Dropdown.displayName = 'Dropdown'
DropdownItem.displayName = 'DropdownItem'
