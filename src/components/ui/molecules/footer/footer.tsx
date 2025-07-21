import { getTranslations } from 'next-intl/server'

import { LOCALE_NAMESPACES } from '@const/languages'

import { getAppName } from '@/utils/get-app-name'

export const Footer = async () => {
	const t = await getTranslations(LOCALE_NAMESPACES.common)
	const year = new Date().getFullYear()
	const appTitle = getAppName()

	return (
		<footer className='mb-16 md:mb-0 mt-8 text-center py-6 border-t border-base-200 bg-transparent backdrop-blur-xs'>
			<div className='text-sm text-footer-text'>
				<p>
					{t.rich('footer.created_by', {
						a: (chunks) => (
							<a
								href='https://pleyt.dev'
								target='_blank'
								rel='noopener noreferrer'
								className='link btn-xs font-medium link-footer-text hover:text-primary'
							>
								{chunks}
							</a>
						),
					})}
				</p>
				<p className='mt-1'>
					{appTitle} {t('footer.copyright', { year })}
				</p>
			</div>
		</footer>
	)
}
