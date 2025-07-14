import type { FC } from 'react'

import { Trans } from 'react-i18next'

import { DEFAULT_LANGUAGE, LOCALE_NAMESPACES } from '@/constants/languages'

export const MiniLogo: FC = () => (
	<p className='flex flex-col justify-center items-center text-center'>
		<img src='/beefi.svg' alt='BeeFi Logo' className='size-8' />
		<p className='text-[0.5rem] text-base-content-secondary'>
			<Trans
				ns={LOCALE_NAMESPACES.common}
				lang={DEFAULT_LANGUAGE}
				i18nKey='app.title'
				components={{ strong: <strong /> }}
				className='text-xs'
			/>
		</p>
	</p>
)
