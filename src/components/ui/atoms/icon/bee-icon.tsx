import { forwardRef } from 'react'

import { Icon, LucideProps } from 'lucide-react'

import { bee } from '@lucide/lab'

export const BeeIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => <Icon iconNode={bee} ref={ref} {...props} />)
BeeIcon.displayName = 'BeeIcon'

export const Bee = BeeIcon
Bee.displayName = 'Bee'
