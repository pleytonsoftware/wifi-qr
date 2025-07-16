'use client'

import type { ReactNode, FC, HTMLAttributes } from 'react'

import { useEffect, useRef } from 'react'

import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useIsClient } from 'usehooks-ts'

import { Button } from '@atoms/button'
import { cn } from '@cn'

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ModalPosition = 'center' | 'bottom'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'onClose'> {
	open: boolean
	onClose: () => void
	children: ReactNode
	size?: ModalSize
	position?: ModalPosition
	showCloseButton?: boolean
	closeOnBackdrop?: boolean
	closeOnEsc?: boolean
	containerClassName?: string
	boxClassName?: string
	/** Whether to render the modal inside a portal */
	usePortal?: boolean
}

const sizeClasses: Record<ModalSize, string> = {
	xs: 'max-w-xs',
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	xl: 'max-w-xl',
}

const positionClasses: Record<ModalPosition, string> = {
	center: 'modal',
	bottom: 'modal modal-bottom sm:modal-middle',
}

export const Modal: FC<ModalProps> = ({
	open,
	onClose,
	children,
	size = 'md',
	position = 'center',
	showCloseButton = false,
	closeOnBackdrop = true,
	closeOnEsc = true,
	containerClassName,
	boxClassName,
	usePortal = true,
	...props
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const isClient = useIsClient()

	// Open/close dialog imperatively
	useEffect(() => {
		if (!isClient) return
		const dialog = dialogRef.current
		if (!dialog) return
		if (open && !dialog.open) dialog.showModal()
		if (!open && dialog.open) dialog.close()
	}, [open, isClient])

	useEffect(() => {
		if (!isClient || !closeOnEsc) return
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && open) onClose()
		}
		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [open, closeOnEsc, onClose, isClient])

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (!closeOnBackdrop) return
		if (e.target === dialogRef.current) onClose()
	}

	useEffect(() => {
		if (!isClient) return
		if (open) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [open, isClient])

	if (!isClient) return null

	const portalTarget = document.body

	const dialog = (
		<dialog
			ref={dialogRef}
			className={cn(positionClasses[position], containerClassName)}
			onClick={handleBackdropClick}
			onClose={onClose}
			{...props}
		>
			<div className={cn('modal-box', sizeClasses[size], boxClassName)}>
				{showCloseButton && (
					<Button
						type='button'
						aria-label='Close'
						size='sm'
						variant='ghost'
						className={cn('absolute right-2 top-2')}
						onClick={onClose}
						icon={<X className='w-4 h-4' />}
					/>
				)}
				{children}
			</div>
		</dialog>
	)

	if (usePortal) {
		return createPortal(dialog, portalTarget)
	}
	return dialog
}
