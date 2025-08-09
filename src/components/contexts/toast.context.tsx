'use client'

import type { ToastVariant } from '../providers/toast.provider'

import { createContext, type MouseEvent, type ReactNode } from 'react'

type ToastMessageButton = {
	label: ReactNode
	onClick: (evt: MouseEvent<HTMLButtonElement>, dismiss: () => void) => void
}

export type ToastMessage = {
	id: number
	title: ReactNode
	description?: ReactNode
	duration?: number // ms, default 3000
	variant?: ToastVariant
	/**
	 * whether to show a progress bar
	 */
	withProgress?: boolean
	button?: ToastMessageButton
}
export type ToastContextType = {
	showToast: (message: Omit<ToastMessage, 'id'>) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
