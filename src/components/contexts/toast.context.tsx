import type { ToastVariant } from '../providers/toast.provider'

import { createContext, type ReactNode } from 'react'

export type ToastMessage = {
	id: number
	title: ReactNode
	description?: ReactNode
	duration?: number // ms, default 3000
	variant?: ToastVariant
}
export type ToastContextType = {
	showToast: (message: Omit<ToastMessage, 'id'>) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
