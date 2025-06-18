import type { FC } from 'react'

import { Input } from '@atoms/input'
import { Select, type SelectOptionProps } from '@atoms/select'
import { Toggle } from '@atoms/toggle'
import { Wifi } from 'lucide-react'

type WiFiConfigFormProps = {
	ssid: string
	setSsid: (v: string) => void
	password: string
	setPassword: (v: string) => void
	securityType: string
	setSecurityType: (v: string) => void
	hiddenNetwork: boolean
	setHiddenNetwork: (v: boolean) => void
	securityOptions: SelectOptionProps[]
	NO_PASS_VALUE: string
}

export const WiFiConfigForm: FC<WiFiConfigFormProps> = ({
	ssid,
	setSsid,
	password,
	setPassword,
	securityType,
	setSecurityType,
	hiddenNetwork,
	setHiddenNetwork,
	securityOptions,
	NO_PASS_VALUE,
}) => {
	return (
		<>
			<Input
				legend='Network Name (SSID)'
				id='ssid'
				placeholder='Enter Wi-Fi network name'
				value={ssid}
				icon={<Wifi className='h-4 w-4' />}
				onChange={(e) => setSsid(e.target.value)}
			/>
			<div className='space-y-2'>
				<Select label='Security Type' defaultValue={securityOptions[0].value} onValueChange={setSecurityType} options={securityOptions} />
			</div>
			{securityType !== NO_PASS_VALUE && (
				<Input
					legend='Password'
					id='password'
					type='password'
					placeholder='Enter Wi-Fi password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			)}
			<Toggle label='Hidden Network?' defaultChecked={hiddenNetwork} onValueChange={setHiddenNetwork} />
		</>
	)
}
