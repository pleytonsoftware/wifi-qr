import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { useToast } from '@hooks/use-toast.hook'
import { Copy, Check } from 'lucide-react'
import { useCallback, useState, type FC } from 'react'

type WiFiStringCopyProps = {
	value: string
}

export const WiFiStringCopy: FC<WiFiStringCopyProps> = ({ value }) => {
	const [copied, setCopied] = useState(false)
	const { showToast } = useToast()
	const copyWiFiString = useCallback(async () => {
		const wifiString = value

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
	}, [value, showToast])

	return (
		<Input
			readOnly
			value={value}
			className='font-mono text-xs'
			Button={Button}
			buttonProps={{
				icon: copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />,
				onClick: copyWiFiString,
			}}
		/>
	)
}
