'use client'

import { memo, useMemo, type FC } from 'react'

import * as yup from 'yup'
import { Wifi } from 'lucide-react'
import { TransKeys, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Input, PasswordInput } from '@atoms/input'
import { Select } from '@atoms/select'
import { Toggle } from '@atoms/toggle'
import { LOCALE_NAMESPACES } from '@const/languages'
import { DEFAULT_SECURITY_TYPE, securityOptions, securityOptionsWithPick, SecurityType } from '@const/wifi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useWiFiQRStore, type WifiDetails } from '@store/wifi-qr.store'

export const WiFiConfigForm: FC = memo(function WiFiConfigForm() {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const wifiDetails = useWiFiQRStore((state) => state.wifiDetails)
	const setWifiDetails = useWiFiQRStore((state) => state.setWifiDetails)
	const schema = useMemo(
		() =>
			yup.object({
				ssid: yup.string().required('wifi_config.fields.network_name.error.required' as TransKeys),
				securityType: yup
					.mixed<SecurityType>()
					.oneOf(
						securityOptions.map((option) => option.value as SecurityType),
						'wifi_config.fields.security_type.error.invalid' as TransKeys,
					)
					.required('wifi_config.fields.security_type.error.invalid' as TransKeys),
				accessPassword: yup.string().when('securityType', {
					is: (securityType: SecurityType) => securityType !== SecurityType.NO_PASS,
					then: (schema) => schema.required('wifi_config.fields.password.error.required' as TransKeys),
					otherwise: (schema) => schema,
				}),
			}) as yup.ObjectSchema<WifiDetails>,
		[],
	)
	const { register, formState, watch, getValues, setValue } = useForm<WifiDetails>({
		defaultValues: {
			ssid: wifiDetails.ssid || '',
			securityType: wifiDetails.securityType || DEFAULT_SECURITY_TYPE,
			accessPassword: wifiDetails.accessPassword || '',
			hiddenNetwork: wifiDetails.hiddenNetwork || false,
		},
		mode: 'all',
		resolver: yupResolver(schema),
	})

	return (
		<form onSubmit={(e) => e.preventDefault()} className='space-y-2'>
			<Input
				legend={t('wifi_config.fields.network_name.label')}
				placeholder={t('wifi_config.fields.network_name.placeholder')}
				icon={<Wifi className='h-4 w-4' />}
				{...register('ssid', {
					onChange: (e) => setWifiDetails({ ssid: e.target.value }),
				})}
				error={formState.errors.ssid && t(formState.errors.ssid?.message as TransKeys)}
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
					{...register('accessPassword', {
						onChange: (e) => setWifiDetails({ accessPassword: e.target.value }),
					})}
					error={formState.errors.accessPassword && t(formState.errors.accessPassword?.message as TransKeys)}
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
