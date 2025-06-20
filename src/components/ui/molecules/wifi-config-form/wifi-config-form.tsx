import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { Select } from '@atoms/select'
import { Toggle } from '@atoms/toggle'
import { useWiFiQRStore } from '@store/wifi-qr.store'
import { Wifi, Eye, EyeClosed } from 'lucide-react'
import { memo, useState, type FC } from 'react'

import { DEFAULT_SECURITY_TYPE, securityOptionsWithPick, SecurityType } from '@/constants/wifi'

export const WiFiConfigForm: FC = memo(() => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const {
		wifiDetails: { ssid, password, securityType, hiddenNetwork },
		setWifiDetails,
	} = useWiFiQRStore()
	const ShowPasswordIcon = showPassword ? Eye : EyeClosed

	return (
		<>
			<Input
				legend='Network Name (SSID)'
				id='ssid'
				placeholder='Enter Wi-Fi network name'
				value={ssid}
				icon={<Wifi className='h-4 w-4' />}
				onChange={(e) =>
					setWifiDetails({
						ssid: e.target.value,
					})
				}
			/>
			<div className='space-y-2'>
				<Select
					label='Security Type'
					defaultValue={DEFAULT_SECURITY_TYPE}
					onValueChange={(securityType) => setWifiDetails({ securityType })}
					options={securityOptionsWithPick}
				/>
			</div>
			{securityType !== SecurityType.NO_PASS && (
				<Input
					legend='Password'
					id='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Enter Wi-Fi password'
					value={password}
					onChange={(e) => setWifiDetails({ password: e.target.value })}
					containerClassName='w-full'
					Button={Button}
					buttonProps={{
						icon: <ShowPasswordIcon className='w-4 h-4' />,
						onClick: setShowPassword.bind(null, (prev) => !prev),
						colour: 'base',
						variant: 'ghost',
					}}
				/>
			)}
			<Toggle
				label='Hidden Network?'
				defaultChecked={hiddenNetwork}
				onValueChange={(hiddenNetwork) =>
					setWifiDetails({
						hiddenNetwork,
					})
				}
			/>
		</>
	)
})
