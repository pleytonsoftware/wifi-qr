import type { WifiDetails } from '@/store/wifi-qr.store'

import { SecurityType } from '@const/wifi'

type WiFiConfig = WifiDetails
export type WifiString = string

export const getWiFiString = ({ ssid, password, securityType, hiddenNetwork }: WiFiConfig): WifiString => {
	if (securityType === SecurityType.NO_PASS || !securityType) {
		return `WIFI:T:nopass;S:${ssid};H:${hiddenNetwork};;`
	}
	return `WIFI:T:${securityType};S:${ssid};P:${password};H:${hiddenNetwork};;`
}
