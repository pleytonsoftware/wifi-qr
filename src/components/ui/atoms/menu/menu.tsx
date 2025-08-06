import { type FC, type ReactNode, type HTMLAttributes, useRef, RefObject, useLayoutEffect, useState, useCallback } from 'react'

import { cn } from '@cn'

import { useOnClickOutside } from 'usehooks-ts'

import { Badge } from '@atoms/badge'
import { Icon } from '@atoms/icon'
import { Tooltip } from '@atoms/tooltip'

type MenuDirection = 'vertical' | 'horizontal'
type MenuSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type MenuPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

type MenuProps = HTMLAttributes<HTMLUListElement> & {
	direction?: MenuDirection
	size?: MenuSize
	responsive?: boolean
	children: ReactNode
	onClickOutside?: () => void
	ignoredOutsideClickTargets?: HTMLElement[]
	anchorRef?: RefObject<HTMLElement | null>
	position?: MenuPosition
	offset?: number
}

type MenuItemProps = HTMLAttributes<HTMLLIElement> & {
	children: ReactNode
	active?: boolean
	disabled?: boolean
	focus?: boolean
	href?: string
	onClick?: () => void
}

type MenuTitleProps = HTMLAttributes<HTMLLIElement> & {
	children: ReactNode
	asParent?: boolean // whether to render as parent title with nested ul
}

type MenuSubmenuProps = HTMLAttributes<HTMLLIElement> & {
	label: ReactNode
	children: ReactNode
	collapsible?: boolean
	open?: boolean
}

type MenuComponent = FC<MenuProps> & {
	Item: FC<MenuItemProps>
	Title: FC<MenuTitleProps>
	Submenu: FC<MenuSubmenuProps>
	Badge: typeof Badge
	Icon: typeof Icon
	Tooltip: typeof Tooltip
}

const directionClasses: Record<MenuDirection, string> = {
	vertical: 'menu-vertical',
	horizontal: 'menu-horizontal',
}

const sizeClasses: Record<MenuSize, string | null> = {
	xs: 'menu-xs',
	sm: 'menu-sm',
	md: null, // Default size
	lg: 'menu-lg',
	xl: 'menu-xl',
}

export const Menu: MenuComponent = ({
	onClickOutside,
	ignoredOutsideClickTargets,
	direction = 'vertical',
	size = 'md',
	responsive = false,
	className,
	children,
	anchorRef,
	position = 'bottom-start',
	offset = 8,
	style,
	...props
}) => {
	const menuRef = useRef<HTMLUListElement>(null)
	const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})

	useOnClickOutside(menuRef as RefObject<HTMLUListElement>, (evt) => {
		if (ignoredOutsideClickTargets?.some((el) => el.contains(evt.target as Node))) {
			return
		}
		onClickOutside?.()
	})
	const calculatePosition = useCallback(() => {
		const anchor = anchorRef?.current
		const menu = menuRef.current
		if (!anchor || !menu) return

		const anchorRect = anchor.getBoundingClientRect()
		const menuRect = menu.getBoundingClientRect()

		let top = 0
		let left = 0

		switch (position) {
			case 'bottom-start':
				top = anchorRect.bottom + window.scrollY + offset
				left = anchorRect.left + window.scrollX
				break
			case 'bottom-end':
				top = anchorRect.bottom + window.scrollY + offset
				left = anchorRect.right - menuRect.width + window.scrollX
				break
			case 'top-start':
				top = anchorRect.top - menuRect.height + window.scrollY - offset
				left = anchorRect.left + window.scrollX
				break
			case 'top-end':
				top = anchorRect.top - menuRect.height + window.scrollY - offset
				left = anchorRect.right - menuRect.width + window.scrollX
				break
			case 'bottom':
				top = anchorRect.bottom + window.scrollY + offset
				left = anchorRect.left + anchorRect.width / 2 - menuRect.width / 2 + window.scrollX
				break
			case 'top':
				top = anchorRect.top - menuRect.height + window.scrollY - offset
				left = anchorRect.left + anchorRect.width / 2 - menuRect.width / 2 + window.scrollX
				break
			case 'left':
				top = anchorRect.top + anchorRect.height / 2 - menuRect.height / 2 + window.scrollY
				left = anchorRect.left - menuRect.width - offset + window.scrollX
				break
			case 'right':
				top = anchorRect.top + anchorRect.height / 2 - menuRect.height / 2 + window.scrollY
				left = anchorRect.right + offset + window.scrollX
				break
		}

		setMenuStyle({
			position: 'absolute',
			top: `${top}px`,
			left: `${left}px`,
		})
	}, [anchorRef, position, offset])

	useLayoutEffect(() => {
		calculatePosition()
	}, [calculatePosition])

	const combinedStyle = {
		...menuStyle,
		...style,
	}

	return (
		<ul
			ref={menuRef}
			className={cn(
				'menu bg-base-300 rounded-box',
				directionClasses[direction],
				responsive && 'menu-vertical lg:menu-horizontal',
				sizeClasses[size],
				anchorRef && 'absolute',
				className,
			)}
			style={combinedStyle}
			{...props}
		>
			{children}
		</ul>
	)
}

export const MenuItem: FC<MenuItemProps> = ({ children, active, disabled, focus, href, onClick, className, ...props }) => {
	const commonClasses = 'w-full'
	const content = href ? (
		<a href={href} className={cn(commonClasses, active && 'menu-active', focus && 'menu-focus')} onClick={onClick}>
			{children}
		</a>
	) : onClick ? (
		<button type='button' className={cn(commonClasses, active && 'menu-active', focus && 'menu-focus')} onClick={onClick}>
			{children}
		</button>
	) : (
		<span className={cn(commonClasses, active && 'menu-active', focus && 'menu-focus')}>{children}</span>
	)

	return (
		<li className={cn(commonClasses, disabled && 'menu-disabled', className)} {...props}>
			{content}
		</li>
	)
}

export const MenuTitle: FC<MenuTitleProps> = ({ children, asParent = false, className, ...props }) => {
	if (asParent) {
		return (
			<li className={className} {...props}>
				<h2 className='menu-title'>{children}</h2>
			</li>
		)
	}

	return (
		<li className={cn('menu-title', className)} {...props}>
			{children}
		</li>
	)
}

export const MenuSubmenu: FC<MenuSubmenuProps> = ({ label, children, collapsible = false, open = false, className, ...props }) => {
	if (collapsible) {
		return (
			<li className={className} {...props}>
				<details open={open}>
					<summary>{label}</summary>
					<ul>{children}</ul>
				</details>
			</li>
		)
	}

	return (
		<li className={className} {...props}>
			<a>{label}</a>
			<ul>{children}</ul>
		</li>
	)
}

Menu.displayName = 'Menu'
MenuItem.displayName = 'MenuItem'
MenuTitle.displayName = 'MenuTitle'
MenuSubmenu.displayName = 'MenuSubmenu'

Menu.Item = MenuItem
Menu.Title = MenuTitle
Menu.Submenu = MenuSubmenu
Menu.Badge = Badge
Menu.Icon = Icon
Menu.Tooltip = Tooltip
