'use client'

import { memo, useCallback, type FC } from 'react'

import { Copy, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { LOCALE_NAMESPACES } from '@const/languages'
import { useCopyToClipboard } from '@hooks/use-copy-to-clipboard.hook'
import { useLanguage } from '@hooks/use-language'
import { useToast } from '@hooks/use-toast.hook'
import { useWiFiQRStore } from '@store/wifi-qr.store'

export const WiFiStringCopy: FC = memo(function WiFiStringCopy() {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const language = useLanguage()
	const [copied, copyToClipboard] = useCopyToClipboard({ defaultTimeoutMs: '2 seconds' })
	const { showToast } = useToast()
	const wifiString = useWiFiQRStore((state) => state.wifiString)
	const copyWiFiString = useCallback(async () => {
		try {
			copyToClipboard(wifiString)

			showToast({
				title: t('wifi_string_copy.toast.copied.title'),
				description: t('wifi_string_copy.toast.copied.description'),
				variant: 'success',
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to copy to clipboard:', error)
			showToast({
				title: t('wifi_string_copy.toast.copy_failed.title'),
				description: t('wifi_string_copy.toast.copy_failed.description'),
				variant: 'error',
			})
		}
	}, [wifiString, showToast, language])

	return (
		<Input
			legend={t('wifi_string_copy.legend')}
			readOnly
			value={
				/^(.*P:)(.*?)(;.*)$/.test(wifiString) && RegExp.$2
					? wifiString.replace(/(P:)(.*?)(;)/, (_, p1, _p2, p3) => p1 + '****' + p3)
					: wifiString
			}
			className='font-mono text-xs'
			Button={Button}
			buttonProps={{
				icon: copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />,
				onClick: copyWiFiString,
			}}
		/>
	)
})
