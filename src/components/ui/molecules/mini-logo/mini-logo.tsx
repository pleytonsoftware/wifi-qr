import type { FC } from 'react'

import Image from 'next/image'

import { getAppName } from '@/utils/get-app-name'

export const MiniLogo: FC = () => (
	<p className='flex flex-col justify-center items-center text-center'>
		<Image src='/beefi.svg' alt={`${getAppName()} Logo`} width={32} height={32} className='size-8' />
		<p className='text-[0.5rem] text-base-content-secondary'>{getAppName()}</p>
	</p>
)
