import * as yup from 'yup'
import { Input, PasswordInput } from '@atoms/input'
import { Select } from '@atoms/select'
import { Toggle } from '@atoms/toggle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useWiFiQRStore } from '@store/wifi-qr.store'
import { Wifi } from 'lucide-react'
import { memo, useMemo, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { LOCALE_NAMESPACES } from '@/constants/languages'
import { DEFAULT_SECURITY_TYPE, securityOptions, securityOptionsWithPick, SecurityType } from '@/constants/wifi'

type WifiConfigFormType = {
	ssid: string
	securityType: SecurityType
	password: string
	hiddenNetwork: boolean
}

export const WiFiConfigForm: FC = memo(() => {
	const { t, i18n } = useTranslation(LOCALE_NAMESPACES.common)
	const schema = useMemo(
		() =>
			yup.object({
				ssid: yup.string().required(t('wifi_config.fields.network_name.error.required')),
				securityType: yup
					.mixed<SecurityType>()
					.oneOf(
						securityOptions.map((option) => option.value as SecurityType),
						t('wifi_config.fields.security_type.error.invalid'),
					)
					.required(t('wifi_config.fields.security_type.error.invalid')),
				password: yup.string().when('securityType', {
					is: (securityType: SecurityType) => securityType !== SecurityType.NO_PASS,
					then: (schema) => schema.required(t('wifi_config.fields.password.error.required')),
					otherwise: (schema) => schema,
				}),
			}) as yup.ObjectSchema<WifiConfigFormType>,
		[i18n.resolvedLanguage],
	)
	const { register, formState, watch, getValues, setValue } = useForm<WifiConfigFormType>({
		defaultValues: {
			ssid: '',
			securityType: DEFAULT_SECURITY_TYPE,
			password: '',
			hiddenNetwork: false,
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})
	const setWifiDetails = useWiFiQRStore((state) => state.setWifiDetails)

	return (
		<form onSubmit={(e) => e.preventDefault()} className='space-y-2'>
			<Input
				legend={t('wifi_config.fields.network_name.label')}
				id='ssid'
				placeholder={t('wifi_config.fields.network_name.placeholder')}
				icon={<Wifi className='h-4 w-4' />}
				{...register('ssid', {
					onChange: (e) => setWifiDetails({ ssid: e.target.value }),
				})}
				error={formState.errors.ssid?.message}
				required
				autoComplete='off'
				autoFocus
			/>
			<Select
				label={t('wifi_config.fields.security_type.label')}
				defaultValue={DEFAULT_SECURITY_TYPE}
				onValueChange={(securityType) => setWifiDetails({ securityType: securityType as SecurityType })}
				options={securityOptionsWithPick.map((option) => ({
					...option,
					label: t(`wifi_config.fields.security_type.options.${option.value}`),
				}))}
				{...register('securityType')}
			/>
			{watch('securityType') !== SecurityType.NO_PASS && (
				<PasswordInput
					legend={t('wifi_config.fields.password.label')}
					id='password'
					placeholder={t('wifi_config.fields.password.placeholder')}
					{...register('password', {
						onChange: (e) => setWifiDetails({ password: e.target.value }),
					})}
					error={formState.errors.password?.message}
					required
				/>
			)}
			<Toggle
				containerClassName='mt-2'
				label={t('wifi_config.fields.hidden_network.label')}
				defaultChecked={getValues('hiddenNetwork')}
				{...register('hiddenNetwork')}
				onValueChange={(hiddenNetwork) => {
					setWifiDetails({
						hiddenNetwork,
					})
					setValue('hiddenNetwork', hiddenNetwork, {
						shouldValidate: true,
					})
				}}
			/>
		</form>
	)
})
