import type { FC, ComponentProps } from 'react'

import { Eye, EyeClosed } from 'lucide-react'
import { useToggle } from 'usehooks-ts'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'

import { Input } from './input'

export const PasswordInput: FC<Omit<ComponentProps<typeof Input>, 'type' | 'Button' | 'buttonProps'>> = ({ ...props }) => {
	const [showPassword, toggle] = useToggle(false)
	const ShowPasswordIcon = showPassword ? Eye : EyeClosed

	return (
		<Input
			type={showPassword ? 'text' : 'password'}
			Button={Button}
			buttonProps={{
				icon: <Icon IconComponent={ShowPasswordIcon} size='sm' />,
				onClick: toggle.bind(null),
				variant: 'outline',
			}}
			{...props}
		/>
	)
}
