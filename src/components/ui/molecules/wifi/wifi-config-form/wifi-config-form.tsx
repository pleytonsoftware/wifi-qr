'use client'

import { memo, type MouseEventHandler, useCallback, useMemo, type FC, useImperativeHandle } from 'react'

import * as yup from 'yup'
import { Eraser, Wifi } from 'lucide-react'
import { TransKeys, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { Input, PasswordInput } from '@atoms/input'
import { Select } from '@atoms/select'
import { Toggle } from '@atoms/toggle'
import { Tooltip } from '@atoms/tooltip'
import { LOCALE_NAMESPACES } from '@const/languages'
import { DEFAULT_SECURITY_TYPE, securityOptions, securityOptionsWithPick, SecurityType } from '@const/wifi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useWiFiQRStore, type WifiDetails } from '@store/wifi-qr.store'

export type WiFiConfigFormRef = {
	clearForm: MouseEventHandler<HTMLButtonElement>
}

type WifiConfigFormProps = {
	ref?: React.ForwardedRef<WiFiConfigFormRef>
}

export const WiFiConfigForm: FC<WifiConfigFormProps> = memo(function WiFiConfigForm({ ref }) {
	const t = useTranslations(LOCALE_NAMESPACES.common)
	const wifiDetails = useWiFiQRStore((state) => state.wifiDetails)
	const setWifiDetails = useWiFiQRStore((state) => state.setWifiDetails)
	const resetWifiDetails = useWiFiQRStore((state) => state.resetWifiDetails)
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
	const { register, formState, watch, getValues, setValue, reset } = useForm<WifiDetails>({
		defaultValues: {
			ssid: wifiDetails.ssid || '',
			securityType: wifiDetails.securityType || DEFAULT_SECURITY_TYPE,
			accessPassword: wifiDetails.accessPassword || '',
			hiddenNetwork: wifiDetails.hiddenNetwork || false,
		},
		mode: 'all',
		resolver: yupResolver(schema),
	})
	const handleClear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
		resetWifiDetails()
		reset()
	}, [resetWifiDetails, reset])

	useImperativeHandle(ref, () => ({
		clearForm: handleClear,
	}))

	return (
		<form onSubmit={(e) => e.preventDefault()} className='space-y-2'>
			<Input
				legend={t('wifi_config.fields.network_name.label')}
				placeholder={t('wifi_config.fields.network_name.placeholder')}
				icon={<Icon IconComponent={Wifi} size='sm' />}
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
			<div className='flex items-center justify-between mt-4'>
				<Toggle
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
				<Tooltip content={t('buttons.clear')}>
					<Button variant='soft' colour='primary' size='sm' type='button' onClick={handleClear}>
						<Icon size='sm' IconComponent={Eraser} />
					</Button>
				</Tooltip>
			</div>
		</form>
	)
})
