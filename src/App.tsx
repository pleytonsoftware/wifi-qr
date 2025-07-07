import { WiFiQRGenerator } from '@organism/wifi-qr-generator'
import { ToastProvider } from '@providers/toast.provider'
import { HelmetProvider } from 'react-helmet-async'

import { SEOHead } from '@/components/seo/seo-head'

import './i18n'

function App() {
	return (
		<HelmetProvider>
			<ToastProvider>
				<SEOHead />
				<WiFiQRGenerator />
			</ToastProvider>
		</HelmetProvider>
	)
}

export default App
