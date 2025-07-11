import { Button, type ButtonProps } from '@atoms/button'
import { cn } from '@cn'
import { type FC, type ReactNode, type HTMLAttributes, useMemo } from 'react'

type DropdownHorizontal = 'center' | 'end' | 'left' | 'right'
type DropdownVertical = 'top' | 'bottom'
type DropdownModifier = 'hover' | 'open'

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
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
	end: 'dropdown-end',
	left: 'dropdown-left',
	right: 'dropdown-right',
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
		<div
			className={cn(
				'dropdown',
				horizontal && horizontalClassMap[horizontal],
				vertical && verticalClassMap[vertical],
				modifierClassNames,
				className,
			)}
			{...props}
		>
			<Button
				as='div'
				role='button'
				type='button'
				colour='base'
				className={cn('m-1', buttonClassName)}
				tabIndex={0}
				aria-label={ariaLabel}
				{...buttonProps}
			>
				{buttonContent}
			</Button>
			<ul
				className={cn('dropdown-content menu shadow-sm rounded-box w-52 bg-base-300', menuClassName)}
				tabIndex={0}
				role='menu'
				aria-label={ariaLabel}
				{...menuProps}
			>
				{children}
			</ul>
		</div>
	)
}

export const DropdownItem: FC<DropdownItemProps> = ({ children, className, selected, ...props }) => (
	<li className={cn(selected && 'bg-base-100 rounded-box', className)} aria-selected={selected} {...props}>
		{children}
	</li>
)

Dropdown.Item = DropdownItem
Dropdown.displayName = 'Dropdown'
DropdownItem.displayName = 'DropdownItem'
