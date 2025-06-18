import type { FC, HTMLAttributes } from 'react'

import { cn } from '@cn'

export type ToastHorizontal = 'start' | 'center' | 'end'
export type ToastVertical = 'top' | 'middle' | 'bottom'

type ToastProps = HTMLAttributes<HTMLDivElement> & {
	horizontal?: ToastHorizontal
	vertical?: ToastVertical
}

const verticalPositions: Record<ToastVertical, string> = {
	top: 'toast-top',
	middle: 'toast-middle',
	bottom: 'toast-bottom',
}

const horizontalPositions: Record<ToastHorizontal, string> = {
	start: 'toast-start',
	center: 'toast-center',
	end: 'toast-end',
}

export const Toast: FC<ToastProps> = ({ children, horizontal = 'end', vertical = 'bottom', className, ...props }) => (
	<div className={cn('toast', verticalPositions[vertical], horizontalPositions[horizontal], className)} {...props}>
		{children}
	</div>
)
