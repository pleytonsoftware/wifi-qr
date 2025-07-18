import type { LayoutProps } from '@/types/app'
import type { ComponentType, FC, HTMLProps, PropsWithChildren } from 'react'

import { notFound } from 'next/navigation'

import { NextIntlClientProvider, hasLocale } from 'next-intl'

import { AVAILABLE_LANGUAGES } from '@const/languages'

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

export const LocaleLayout: FC<LocaleLayoutProps> = async ({ children, params: resolvedParams, htmlProps, ...props }) => {
	return (
		<html lang={resolvedParams.locale} {...htmlProps}>
			<body {...props}>
				<NextIntlClientProvider>{children}</NextIntlClientProvider>
			</body>
		</html>
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
