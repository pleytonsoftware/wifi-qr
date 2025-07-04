export enum SecurityType {
	WPA = 'WPA',
	WEP = 'WEP',
	NO_PASS = 'nopass',
}

export const pickLabel = { label: 'Select security type', disabled: true, value: 'pick' } as const
export const securityOptions = [
	{ value: SecurityType.WPA, label: 'WPA/WPA2/WPA3' },
	{ value: SecurityType.WEP, label: 'WEP' },
	{ value: SecurityType.NO_PASS, label: 'No Password' },
] as const
export const securityOptionsWithPick = [pickLabel, ...securityOptions] as const

export const DEFAULT_SECURITY_TYPE: SecurityType = SecurityType.WPA
