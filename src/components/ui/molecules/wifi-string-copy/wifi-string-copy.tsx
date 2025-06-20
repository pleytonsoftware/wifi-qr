import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { useToast } from '@hooks/use-toast.hook'
import { Copy, Check } from 'lucide-react'
import { memo, useCallback, useState, type FC } from 'react'

import { useWiFiQRStore } from '@/store/wifi-qr.store'

export const WiFiStringCopy: FC = memo(() => {
	const [copied, setCopied] = useState(false)
	const { showToast } = useToast()
	const wifiString = useWiFiQRStore((state) => state.wifiString)
	const copyWiFiString = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(wifiString)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)

			showToast({
				title: 'Copied to Clipboard',
				description: 'Wi-Fi configuration string copied successfully.',
				variant: 'success',
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to copy to clipboard:', error)
			showToast({
				title: 'Copy Failed',
				description: 'Unable to copy to clipboard.',
				variant: 'error',
			})
		}
	}, [wifiString, showToast])

	return (
		<Input
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
