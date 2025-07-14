import { use } from 'react'

import { ToastContext } from '@/components/contexts/toast.context'

export const useToast = () => {
	const ctx = use(ToastContext)
	if (!ctx) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return ctx
}
