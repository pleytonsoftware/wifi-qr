import { WiFiQRGenerator } from '@organism/wifi-qr-generator'
import { ToastProvider } from '@providers/toast.provider'

function App() {
	return (
		<ToastProvider>
			<WiFiQRGenerator />
		</ToastProvider>
	)
}

export default App
