import { Button } from '@atoms/button'
import { Input } from '@atoms/input'
import { Select } from '@atoms/select'
import { Toggle } from '@atoms/toggle'
import { useWiFiQRStore } from '@store/wifi-qr.store'
import { Wifi, Eye, EyeClosed } from 'lucide-react'
import { memo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { DEFAULT_SECURITY_TYPE, securityOptionsWithPick, SecurityType } from '@/constants/wifi'

export const WiFiConfigForm: FC = memo(() => {
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const {
		wifiDetails: { ssid, password, securityType, hiddenNetwork },
		setWifiDetails,
	} = useWiFiQRStore()
	const ShowPasswordIcon = showPassword ? Eye : EyeClosed

	return (
		<>
			<Input
				legend={t('wifi_config.fields.network_name.label')}
				id='ssid'
				placeholder={t('wifi_config.fields.network_name.placeholder')}
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
					label={t('wifi_config.fields.security_type.label')}
					defaultValue={DEFAULT_SECURITY_TYPE}
					onValueChange={(securityType) => setWifiDetails({ securityType: securityType as SecurityType })}
					options={securityOptionsWithPick.map((option) => ({
						...option,
						label: t(`wifi_config.fields.security_type.options.${option.value}`),
					}))}
				/>
			</div>
			{securityType !== SecurityType.NO_PASS && (
				<Input
					legend={t('wifi_config.fields.password.label')}
					id='password'
					type={showPassword ? 'text' : 'password'}
					placeholder={t('wifi_config.fields.password.placeholder')}
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
				label={t('wifi_config.fields.hidden_network.label')}
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
