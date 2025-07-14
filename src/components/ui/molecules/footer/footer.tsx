import { useRef, type FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { DEFAULT_LANGUAGE, LOCALE_NAMESPACES } from '@/constants/languages'

export const Footer: FC = () => {
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const yearRef = useRef(new Date().getFullYear())

	return (
		<footer className='mt-8 text-center py-6 border-t border-base-200 bg-transparent backdrop-blur-xs'>
			<div className='text-sm text-footer-text'>
				<p>
					<Trans ns={LOCALE_NAMESPACES.common} i18nKey='footer.created_by'>
						<a
							href='https://pleyt.dev'
							target='_blank'
							rel='noopener noreferrer'
							className='link btn-xs font-medium link-footer-text hover:text-primary'
						></a>
					</Trans>
				</p>
				<p className='mt-1'>
					{t('app.title', {
						lng: DEFAULT_LANGUAGE,
					})}{' '}
					{t('footer.copyright', { year: yearRef.current })}
				</p>
			</div>
		</footer>
	)
}
