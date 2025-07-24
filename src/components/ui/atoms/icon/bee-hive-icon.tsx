import { forwardRef } from 'react'

import { Icon, LucideProps } from 'lucide-react'

import { beeHive } from '@lucide/lab'

export const BeeHiveIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => <Icon iconNode={beeHive} ref={ref} {...props} />)
BeeHiveIcon.displayName = 'BeeHiveIcon'

export const BeeHive = BeeHiveIcon
BeeHive.displayName = 'BeeHive'
