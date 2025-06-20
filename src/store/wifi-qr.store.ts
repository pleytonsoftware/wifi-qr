import { create } from 'zustand'

import { DEFAULT_SECURITY_TYPE } from '@/constants/wifi'
import { getWiFiString, type WifiString } from '@/utils/qr-generator'

export type WifiDetails = {
	ssid: string
	password: string
	securityType: string
	hiddenNetwork: boolean
}
export type WiFiQRState = {
	wifiDetails: WifiDetails
	wifiString: WifiString
	setWifiDetails: (details: Partial<WifiDetails>) => void
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
			}
		}),
}))
