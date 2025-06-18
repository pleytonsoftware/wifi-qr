import type { FC, HTMLAttributes } from 'react'

import { cn } from '@cn'

export type AlertColour = 'info' | 'success' | 'warning' | 'error'
type AlertProps = HTMLAttributes<HTMLDivElement> & {
	colour?: AlertColour
}

const alertColours: Record<AlertColour, string> = {
	info: 'alert-info',
	success: 'alert-success',
	warning: 'alert-warning',
	error: 'alert-error',
}

export const Alert: FC<AlertProps> = ({ colour = 'info', className, children, ...props }) => {
	const childrenNode = typeof children === 'string' ? <span>{children}</span> : children

	return (
		<div className={cn('alert', alertColours[colour], className)} {...props}>
			{childrenNode}
		</div>
	)
}
