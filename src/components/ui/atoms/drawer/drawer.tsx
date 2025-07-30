'use client'

import type { FC, ReactNode, HTMLAttributes, InputHTMLAttributes, MouseEventHandler } from 'react'

import { cn } from '@cn'

import { createPortal } from 'react-dom'
import { useIsClient } from 'usehooks-ts'

import { createBtnStyles, type ButtonProps } from '@atoms/button'

import { DrawerContextProvider } from './drawer.context'
import { useDrawerContext } from './drawer.hook'

type DrawerPlacement = 'left' | 'right'

export type DrawerProps = HTMLAttributes<HTMLDivElement> & {
	toggleId: string
	open?: boolean
	keepOpen?: boolean
	onToggle?: (open: boolean) => void
	placement?: DrawerPlacement
	children: ReactNode
	usePortal?: boolean
}

type DrawerInputProps = InputHTMLAttributes<HTMLInputElement>

type DrawerContentProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

type DrawerSideProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	overlayClassName?: string
	onOverlayClick?: () => void
}

type DrawerComponent = FC<DrawerProps> & {
	Toggle: FC<DrawerInputProps>
	Content: FC<DrawerContentProps>
	Side: FC<DrawerSideProps>
	Button: FC<ButtonProps>
}

const placementClasses: Record<DrawerPlacement, string> = {
	left: '', // Default placement
	right: 'drawer-end',
}

export const Drawer: DrawerComponent = ({
	toggleId,
	open,
	onToggle,
	keepOpen,
	placement = 'left',
	className,
	children,
	usePortal = false,
	...props
}) => {
	const isClient = useIsClient()

	const drawer = (
		<DrawerContextProvider value={{ toggleId, open, onToggle, placement, usePortal, keepOpen }}>
			<div className={cn('drawer', placementClasses[placement], keepOpen && 'drawer-open', className)} {...props}>
				<Drawer.Toggle />
				{children}
			</div>
		</DrawerContextProvider>
	)

	if (usePortal && isClient) {
		return createPortal(drawer, document.body)
	}

	return drawer
}

export const DrawerToggle: FC<DrawerInputProps> = ({ className, onChange, ...props }) => {
	const { toggleId, open } = useDrawerContext()

	return (
		<input
			id={toggleId}
			type='checkbox'
			className={cn('drawer-toggle', className)}
			onChange={(e) => {
				onChange?.(e)
			}}
			checked={open}
			{...props}
		/>
	)
}

export const DrawerContent: FC<DrawerContentProps> = ({ children, className, ...props }) => {
	return (
		<div className={cn('drawer-content', className)} {...props}>
			{children}
		</div>
	)
}

export const DrawerSide: FC<DrawerSideProps> = ({ children, onOverlayClick, overlayClassName, className, ...props }) => {
	const { toggleId } = useDrawerContext()

	return (
		<div className={cn('drawer-side', className)} {...props}>
			<label
				className={cn('drawer-overlay hover:cursor-auto', overlayClassName)}
				htmlFor={toggleId}
				aria-label='close sidebar'
				onClick={onOverlayClick}
			/>
			{children}
		</div>
	)
}

export const DrawerButton: FC<ButtonProps> = ({ children, className, colour, variant, size, ...props }) => {
	const { toggleId } = useDrawerContext()
	return (
		<label
			role='button'
			htmlFor={toggleId}
			className={cn('drawer-button', createBtnStyles({ colour, variant, size, disabled: props.disabled }), className)}
			onClick={props.onClick as unknown as MouseEventHandler<HTMLLabelElement>}
		>
			{children}
		</label>
	)
}

Drawer.Toggle = DrawerToggle
Drawer.Content = DrawerContent
Drawer.Side = DrawerSide
Drawer.Button = DrawerButton

Drawer.displayName = 'Drawer'
DrawerToggle.displayName = 'DrawerToggle'
DrawerContent.displayName = 'DrawerContent'
DrawerSide.displayName = 'DrawerSide'
DrawerButton.displayName = 'DrawerButton'
