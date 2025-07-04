import { WiFiQRGenerator } from '@organism/wifi-qr-generator'
import { ToastProvider } from '@providers/toast.provider'

import './i18n'

function App() {
	return (
		<ToastProvider>
			<WiFiQRGenerator />
		</ToastProvider>
	)
}

export default App
