import type { LucideIcon, LucideProps } from 'lucide-react'
import type { FC } from 'react'

import { cn } from '@cn'

type IconProps = LucideProps & {
	IconComponent: LucideIcon
}

export const Icon: FC<IconProps> = ({ IconComponent, className, ...iconProps }) => (
	<IconComponent className={cn('size-5', className)} {...iconProps} />
)
