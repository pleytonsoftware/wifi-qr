'use client'

import { useCallback, useEffect, useRef, useState, type FC, type PropsWithChildren } from 'react'

import { X } from 'lucide-react'
import ms from 'ms'

import { Alert, type AlertColour } from '@atoms/alert'
import { Button } from '@atoms/button'
import { Toast, type ToastHorizontal, type ToastVertical } from '@atoms/toast'
import { ToastContext, type ToastContextType, type ToastMessage } from '@contexts/toast.context'

export type ToastVariant = AlertColour

export type ToastProviderProps = PropsWithChildren<{
	horizontalPosition?: ToastHorizontal
	verticalPosition?: ToastVertical
	defaultDuration?: ms.StringValue // ms, default 3000
}>

const TOAST_DEFAULT_DURATION = ms('3 seconds')

export const ToastProvider: FC<ToastProviderProps> = ({ defaultDuration, children, horizontalPosition, verticalPosition }) => {
	const timeoutIds = useRef<number[]>([])
	const [toasts, setToasts] = useState<ToastMessage[]>([])
	const defaultDurationMs = defaultDuration ? ms(defaultDuration) : TOAST_DEFAULT_DURATION

	const handleDismiss = useCallback((id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
		timeoutIds.current = timeoutIds.current.filter((tid) => tid !== id)
	}, [])
	const showToast = useCallback<ToastContextType['showToast']>(
		(message) => {
			const duration = message?.duration ?? defaultDurationMs
			const timeoutId = window.setTimeout(() => {
				handleDismiss(toast.id)
			}, duration)
			const toast: ToastMessage = {
				id: timeoutId,
				...message,
				duration,
			}
			setToasts((prev) => [...prev, toast])
			timeoutIds.current.push(timeoutId)
		},
		[defaultDurationMs, handleDismiss],
	)

	useEffect(() => {
		return () => {
			timeoutIds.current.forEach(clearTimeout)
			timeoutIds.current = []
		}
	}, [])

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<Toast horizontal={horizontalPosition} vertical={verticalPosition} className='z-50 pointer-events-none'>
				{toasts.map((toast) => (
					<Alert
						key={toast.id}
						colour={toast.variant}
						className='shadow-lg pointer-events-auto flex items-start gap-2 relative rounded-lg overflow-hidden max-w-sm'
					>
						<div className='flex-1 pr-6 rtl:pl-6'>
							<p className='text-lg font-semibold'>{toast.title}</p>
							{toast.description && <p className='text-sm'>{toast.description}</p>}
						</div>
						<Button
							type='button'
							aria-label='Dismiss'
							variant='ghost'
							size='xs'
							colour={toast.variant}
							className='absolute top-1 right-1'
							onClick={() => handleDismiss(toast.id)}
							icon={<X className='h-4 w-4' />}
						>
							<span aria-hidden='true' className='hidden' />
						</Button>
						{toast.withProgress && (
							<div className='w-full h-1 absolute left-0 bottom-0'>
								<div
									className='h-full bg-primary rounded-lg'
									style={{
										width: '100%',
										animation: `toast-progress ${toast.duration}ms linear forwards`,
									}}
								/>
							</div>
						)}
					</Alert>
				))}
			</Toast>
		</ToastContext.Provider>
	)
}
