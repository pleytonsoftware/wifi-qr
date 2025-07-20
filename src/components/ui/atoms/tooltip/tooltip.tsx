import type { FC, ReactNode, HTMLAttributes } from 'react'

import { cn } from '@cn'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
type TooltipColour = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
	content: ReactNode
	children: ReactNode
	placement?: TooltipPlacement
	colour?: TooltipColour
	open?: boolean
	className?: string
	contentClassName?: string
}

/**
 * Tooltip component using daisyUI classes.
 *
 * - `content`: Tooltip text or custom node.
 * - `placement`: top | bottom | left | right (default: top)
 * - `colour`: neutral | primary | secondary | accent | info | success | warning | error
 * - `open`: force tooltip to be open
 */
export const Tooltip: FC<TooltipProps> = ({ content, children, placement = 'top', colour, open = false, className, contentClassName, ...props }) => {
	const placementClass = placement ? `tooltip-${placement}` : ''
	const colourClass = colour ? `tooltip-${colour}` : ''
	const openClass = open ? 'tooltip-open' : ''

	return (
		<div
			className={cn('tooltip', placementClass, colourClass, openClass, className)}
			{...(typeof content === 'string' ? { 'data-tip': content } : {})}
			{...props}
		>
			{typeof content === 'string' || !content ? (
				children
			) : (
				<>
					<div className={cn('tooltip-content', contentClassName)}>{content}</div>
					{children}
				</>
			)}
		</div>
	)
}
