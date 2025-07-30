import type { LayoutProps } from '@/types/app'
import type { ComponentType, FC, HTMLProps, PropsWithChildren } from 'react'

import { Montserrat, Quicksand } from 'next/font/google'
import { notFound } from 'next/navigation'

import { cn } from '@cn'

import { NextIntlClientProvider, hasLocale } from 'next-intl'

import { AVAILABLE_LANGUAGES, RTL_LANGUAGES } from '@const/languages'
import { NProgressProvider } from '@providers/nprogress.provider'

type ResolvedLayoutParams = Awaited<LayoutProps['params']>
type LocaleMiddleware = (params: ResolvedLayoutParams) => ResolvedLayoutParams | Promise<ResolvedLayoutParams>
export type ResolveLocaleLayoutProps<T = unknown> = T & {
	params: ResolvedLayoutParams
}

type WithLocaleProps<T = unknown> = [
	ComponentType<ResolveLocaleLayoutProps<T>>,
	{
		localeMiddleware?: LocaleMiddleware
	},
]

type LocaleLayoutProps<T = unknown> = ResolveLocaleLayoutProps<PropsWithChildren<HTMLProps<HTMLBodyElement & T>>> & {
	htmlProps?: HTMLProps<HTMLHtmlElement> & Record<`data-${string}`, string>
}

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	style: ['italic', 'normal'],
})

const quicksand = Quicksand({
	variable: '--font-quicksand',
	subsets: ['latin'],
	display: 'swap',
})

export const LocaleLayout: FC<LocaleLayoutProps> = async ({ children, params: resolvedParams, htmlProps, ...props }) => {
	return (
		<NextIntlClientProvider>
			<html
				lang={resolvedParams.locale}
				dir={RTL_LANGUAGES.includes(resolvedParams.locale as (typeof RTL_LANGUAGES)[number]) ? 'rtl' : 'ltr'}
				className={cn(montserrat.variable, quicksand.variable)}
				{...htmlProps}
			>
				<body {...props}>
					<NProgressProvider />
					{children}
				</body>
			</html>
		</NextIntlClientProvider>
	)
}

export function withLocale<T = unknown>(Component: WithLocaleProps<T>[0], options?: WithLocaleProps<T>[1]): FC<LayoutProps<T>> {
	return async function LocalizedComponent(props: LayoutProps<T>) {
		let resolvedParams = await props.params
		resolvedParams = (await options?.localeMiddleware?.(resolvedParams)) || resolvedParams

		if (!hasLocale(AVAILABLE_LANGUAGES, resolvedParams.locale)) {
			notFound()
		}

		return <Component {...props} params={resolvedParams} />
	}
}
