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

export const useWiFiQRStore = create<WiFiQRState>((set) => ({
	wifiDetails: initialWifiDetails,
	wifiString: getWiFiString(initialWifiDetails),
	wifiDataUrl: undefined,
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
		})),
}))
