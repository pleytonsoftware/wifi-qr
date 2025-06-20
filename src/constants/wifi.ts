import type { SelectOptionProps } from '@atoms/select'

export enum SecurityType {
	WPA = 'WPA',
	WEP = 'WEP',
	NO_PASS = 'nopass',
}

export const pickLabel: SelectOptionProps = { label: 'Select security type', disabled: true, value: 'pick' }
export const securityOptions: SelectOptionProps[] = [
	{ value: SecurityType.WPA, label: 'WPA/WPA2/WPA3' },
	{ value: SecurityType.WEP, label: 'WEP' },
	{ value: SecurityType.NO_PASS, label: 'No Password' },
]
export const securityOptionsWithPick: SelectOptionProps[] = [pickLabel, ...securityOptions]

export const DEFAULT_SECURITY_TYPE: SecurityType = SecurityType.WPA
