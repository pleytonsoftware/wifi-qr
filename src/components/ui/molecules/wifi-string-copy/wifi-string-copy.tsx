import type { FC } from 'react'

import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { Copy, Check } from 'lucide-react'

type WiFiStringCopyProps = {
	value: string
	copied: boolean
	onCopy: () => void
}

export const WiFiStringCopy: FC<WiFiStringCopyProps> = ({ value, copied, onCopy }) => {
	return (
		<Input
			readOnly
			value={value}
			className='font-mono text-xs'
			Button={Button}
			buttonProps={{
				icon: copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />,
				onClick: onCopy,
			}}
		/>
	)
}
