type WiFiConfig = {
	ssid: string
	password: string
	security?: string
	hidden?: boolean
}

export const NO_PASS_VALUE = 'nopass' as const
export const getWiFiString = ({ ssid, password, security = 'WPA', hidden = false }: WiFiConfig) => {
	if (security === NO_PASS_VALUE) {
		return `WIFI:T:nopass;S:${ssid};H:${hidden};;`
	}
	return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden};;`
}
