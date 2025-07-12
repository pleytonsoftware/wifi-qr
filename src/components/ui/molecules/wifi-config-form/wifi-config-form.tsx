import type { ParseKeys } from 'i18next'

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
	const { t } = useTranslation(LOCALE_NAMESPACES.common)
	const schema = useMemo(
		() =>
			yup.object({
				ssid: yup.string().required('wifi_config.fields.network_name.error.required' as ParseKeys<'common'>),
				securityType: yup
					.mixed<SecurityType>()
					.oneOf(
						securityOptions.map((option) => option.value as SecurityType),
						'wifi_config.fields.security_type.error.invalid' as ParseKeys<'common'>,
					)
					.required('wifi_config.fields.security_type.error.invalid' as ParseKeys<'common'>),
				password: yup.string().when('securityType', {
					is: (securityType: SecurityType) => securityType !== SecurityType.NO_PASS,
					then: (schema) => schema.required('wifi_config.fields.password.error.required' as ParseKeys<'common'>),
					otherwise: (schema) => schema,
				}),
			}) as yup.ObjectSchema<WifiConfigFormType>,
		[],
	)
	const { register, formState, watch, getValues, setValue } = useForm<WifiConfigFormType>({
		defaultValues: {
			ssid: '',
			securityType: DEFAULT_SECURITY_TYPE,
			password: '',
			hiddenNetwork: false,
		},
		mode: 'all',
		resolver: yupResolver(schema),
	})
	const setWifiDetails = useWiFiQRStore((state) => state.setWifiDetails)

	return (
		<form onSubmit={(e) => e.preventDefault()} className='space-y-2'>
			<Input
				legend={t('wifi_config.fields.network_name.label')}
				placeholder={t('wifi_config.fields.network_name.placeholder')}
				icon={<Wifi className='h-4 w-4' />}
				{...register('ssid', {
					onChange: (e) => setWifiDetails({ ssid: e.target.value }),
				})}
				error={formState.errors.ssid && t(formState.errors.ssid?.message as ParseKeys<'common'>)}
				required
				autoComplete='off'
			/>
			<Select
				label={t('wifi_config.fields.security_type.label')}
				defaultValue={DEFAULT_SECURITY_TYPE}
				options={securityOptionsWithPick.map((option) => ({
					...option,
					label: t(`wifi_config.fields.security_type.options.${option.value}`),
				}))}
				{...register('securityType')}
				onValueChange={(securityType) => setWifiDetails({ securityType: securityType as SecurityType })}
			/>
			{watch('securityType') !== SecurityType.NO_PASS && (
				<PasswordInput
					legend={t('wifi_config.fields.password.label')}
					placeholder={t('wifi_config.fields.password.placeholder')}
					{...register('password', {
						onChange: (e) => setWifiDetails({ password: e.target.value }),
					})}
					error={formState.errors.password && t(formState.errors.password?.message as ParseKeys<'common'>)}
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
