import type { FC, ComponentProps } from 'react'

import { Button } from '@atoms/button'
import { Eye, EyeClosed } from 'lucide-react'
import { useToggle } from 'usehooks-ts'

import { Input } from './input'

export const PasswordInput: FC<Omit<ComponentProps<typeof Input>, 'type' | 'Button' | 'buttonProps'>> = ({ ...props }) => {
	const [showPassword, toggle] = useToggle(false)
	const ShowPasswordIcon = showPassword ? Eye : EyeClosed

	return (
		<Input
			type={showPassword ? 'text' : 'password'}
			Button={Button}
			buttonProps={{
				icon: <ShowPasswordIcon className='w-4 h-4' />,
				onClick: toggle.bind(null),
				variant: 'outline',
			}}
			{...props}
		/>
	)
}
