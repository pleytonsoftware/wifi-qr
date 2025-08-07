'use client'

import type { ComponentProps, FC, MouseEventHandler } from 'react'

import { redirect } from '@navigation'

import { cn } from '@cn'

import { Globe } from 'lucide-react'

import { Icon } from '@atoms/icon'
import { LOCALE_DICTIONARY, Languages } from '@const/languages'

import { AVAILABLE_LANGUAGE_FLAGS_DICTIONARY } from '@/assets/flags'

type LanguageKey = keyof typeof AVAILABLE_LANGUAGE_FLAGS_DICTIONARY

type MinProps = {
	onClick?: MouseEventHandler<unknown>
	className?: string
}

type LanguageSelectorItemProps<E = unknown> = {
	lang: LanguageKey
	selected: boolean
	selectedKey?: string
	path: string
	params: URLSearchParams
	ParentComponent: FC<MinProps & E>
	parentProps?: ComponentProps<FC<MinProps & E>>
}

export const LanguageSelectorItem = <E,>({
	lang,
	selected,
	selectedKey = 'selected',
	path,
	params,
	ParentComponent,
	parentProps,
}: LanguageSelectorItemProps<E>) => {
	const Flag = AVAILABLE_LANGUAGE_FLAGS_DICTIONARY[lang]
	const langName = LOCALE_DICTIONARY[lang]
	const selectedProp = {
		[selectedKey]: selected,
	}

	return (
		<ParentComponent
			{...(parentProps as Omit<MinProps, 'onClick'> & E)}
			onClick={(evt) => {
				redirect({
					href: {
						pathname: path,
						query: Object.fromEntries(params.entries()),
					},
					locale: lang as unknown as Languages,
				})
				parentProps?.onClick?.(evt)
			}}
			{...selectedProp}
			className={cn('max-w-1/2', parentProps?.className)}
		>
			<div className='flex items-center gap-2'>
				{Flag ? <Flag className='size-3' /> : <Icon IconComponent={Globe} />}
				<span className='truncate'>{langName}</span>
			</div>
		</ParentComponent>
	)
}
