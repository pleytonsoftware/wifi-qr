import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

import { LOCALE_NAMESPACES } from '@const/languages'
import { PageNotFound } from '@organism/not-found'

import { formatTitle } from '@/utils/get-app-name'

// ! Doesn't seem to work in not-found page.
// * Temporarily moved to JSX to ensure it works properly.
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations(LOCALE_NAMESPACES.notFound)

	return {
		title: formatTitle(t('seo.title')),
		description: t('seo.description'),
	}
}

export default async function NotFound() {
	const t = await getTranslations(LOCALE_NAMESPACES.notFound)

	return (
		<>
			<title>{formatTitle(t('seo.title'))}</title>
			<meta name='description' content={t('seo.description')} />
			<PageNotFound />
		</>
	)
}
