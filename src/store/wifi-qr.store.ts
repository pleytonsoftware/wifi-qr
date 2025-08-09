import { create } from 'zustand'

import { DEFAULT_SECURITY_TYPE, SecurityType } from '@const/wifi'

import { getWiFiString, type WifiString } from '@/utils/qr-generator'

export type WifiDetails = {
	ssid: string
	accessPassword: string
	securityType: SecurityType
	hiddenNetwork: boolean
}
export type WiFiQRState = {
	wifiDetails: WifiDetails
	wifiString: WifiString
	wifiDataUrl?: string
	isWifiValid: boolean
	setWifiDetails: (details: Partial<WifiDetails>) => void
	setWifiDataUrl: (dataUrl: string) => void
	resetWifiDetails: () => void
}
const initialWifiDetails: WifiDetails = {
	ssid: '',
	accessPassword: '',
	securityType: DEFAULT_SECURITY_TYPE,
	hiddenNetwork: false,
}

const isWifiValid = (wifiDetails: WifiDetails): boolean => {
	const { ssid, accessPassword, securityType } = wifiDetails
	return (
		Boolean(ssid.trim()) &&
		(securityType === SecurityType.NO_PASS ||
			((securityType === SecurityType.WPA || securityType === SecurityType.WEP) && Boolean(accessPassword.trim())))
	)
}

export const useWiFiQRStore = create<WiFiQRState>((set) => ({
	wifiDetails: initialWifiDetails,
	wifiString: getWiFiString(initialWifiDetails),
	wifiDataUrl: undefined,
	isWifiValid: false,
	// Actions
	setWifiDetails: ({ ssid, accessPassword, securityType, hiddenNetwork }) =>
		set(({ wifiDetails }) => {
			const updatedDetails = {
				ssid: ssid ?? wifiDetails.ssid,
				accessPassword: accessPassword ?? wifiDetails.accessPassword,
				securityType: securityType ?? wifiDetails.securityType,
				hiddenNetwork: hiddenNetwork ?? wifiDetails.hiddenNetwork,
			}

			return {
				wifiDetails: updatedDetails,
				wifiString: getWiFiString(updatedDetails),
				wifiDataUrl: undefined,
				isWifiValid: isWifiValid(updatedDetails),
			}
		}),
	setWifiDataUrl: (dataUrl: string) =>
		set(() => ({
			wifiDataUrl: dataUrl,
		})),
	resetWifiDetails: () =>
		set(() => ({
			wifiDetails: initialWifiDetails,
			wifiString: getWiFiString(initialWifiDetails),
			wifiDataUrl: undefined,
			isWifiValid: false,
		})),
}))
