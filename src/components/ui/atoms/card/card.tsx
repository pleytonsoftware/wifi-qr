import type { FC, ReactNode, HTMLAttributes, ComponentProps } from 'react'

import Image from 'next/image'

import { cn } from '@cn'

type CardComponent = FC<CardProps> & {
	Body: FC<HTMLAttributes<HTMLDivElement>>
	Title: FC<HTMLAttributes<HTMLDivElement>>
	Description: FC<HTMLAttributes<HTMLDivElement>>
	Actions: FC<HTMLAttributes<HTMLDivElement>>
	Image: FC<
		ComponentProps<typeof Image> & {
			figureClassName?: string
		}
	>
}
type CardColour = 'base' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type CardProps = HTMLAttributes<HTMLDivElement> & {
	colour?: CardColour
	size?: CardSize
	border?: boolean
	dashed?: boolean
	sideImage?: ReactNode
	containerClassName?: string
	children?: ReactNode
}

const colourClasses: Record<CardColour, string> = {
	base: 'bg-base-200',
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	accent: 'bg-accent',
	info: 'bg-info',
	success: 'bg-success',
	warning: 'bg-warning',
	error: 'bg-error',
}

const sizeClasses: Record<CardSize, string> = {
	xs: 'card-xs',
	sm: 'card-sm',
	md: 'card-md',
	lg: 'card-lg',
	xl: 'card-xl',
}

export const Card: CardComponent = ({
	colour = 'base',
	size = 'md',
	border = false,
	dashed = false,
	containerClassName,
	children,
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'card shadow-lg',
				colourClasses[colour],
				sizeClasses[size],
				border && 'card-border',
				dashed && 'card-dash',
				containerClassName,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export const CardBody: CardComponent['Body'] = ({ className, ...props }) => <div className={cn('card-body', className)} {...props} />

export const CardTitle: CardComponent['Title'] = ({ className, ...props }) => <h2 className={cn('card-title', className)} {...props} />
export const CardDescription: CardComponent['Description'] = ({ className, ...props }) => (
	<span className={cn('text-sm text-base-content-secondary', className)} {...props} />
)

export const CardActions: CardComponent['Actions'] = ({ className, ...props }) => <div className={cn('card-actions', className)} {...props} />

export const CardImage: CardComponent['Image'] = ({ figureClassName, alt = '', ...props }) => (
	<figure className={cn(figureClassName)}>
		<Image alt={alt} {...props} />
	</figure>
)

Card.Body = CardBody
Card.Title = CardTitle
Card.Description = CardDescription
Card.Actions = CardActions
Card.Image = CardImage
