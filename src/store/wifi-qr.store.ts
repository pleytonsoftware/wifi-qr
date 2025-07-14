import { create } from 'zustand'

import { DEFAULT_SECURITY_TYPE, SecurityType } from '@/constants/wifi'
import { getWiFiString, type WifiString } from '@/utils/qr-generator'

export type WifiDetails = {
	ssid: string
	password: string
	securityType: SecurityType
	hiddenNetwork: boolean
}
export type WiFiQRState = {
	wifiDetails: WifiDetails
	wifiString: WifiString
	wifiDataUrl?: string
	setWifiDetails: (details: Partial<WifiDetails>) => void
	setWifiDataUrl: (dataUrl: string) => void
}
const initialWifiDetails: WifiDetails = {
	ssid: '',
	password: '',
	securityType: DEFAULT_SECURITY_TYPE,
	hiddenNetwork: false,
}

export const useWiFiQRStore = create<WiFiQRState>((set) => ({
	wifiDetails: initialWifiDetails,
	wifiString: getWiFiString(initialWifiDetails),
	wifiDataUrl: undefined,
	setWifiDetails: ({ ssid, password, securityType, hiddenNetwork }) =>
		set(({ wifiDetails }) => {
			const updatedDetails = {
				ssid: ssid ?? wifiDetails.ssid,
				password: password ?? wifiDetails.password,
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
}))
