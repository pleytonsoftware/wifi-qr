import type { FC } from 'react'

import { Wifi } from 'lucide-react'

export const WifiQRCodePrinter: FC<{ ssid?: string; dataUrl: string }> = ({ ssid, dataUrl }) => {
	return (
		<html>
			<head>
				<title>Wi-Fi QR Code - ${ssid}</title>
				<style>{`
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #f3f4f6;
          }
          .qr-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px solid #e5e7eb;
            border-radius: 1rem;
            background: #fff;
            box-shadow: 0 2px 8px 0 #0001;
            padding: 2rem 2.5rem;
            ${ssid ? 'padding-top: 1.5rem;' : ''}
            max-width: 200px;
            width: 100%;
          }
          .ssid {
            font-family: sans-serif;
            font-size: 1.25rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            text-align: center;
            word-break: break-word;
            width: 100%;
            color: #22223b;
          }
          img {
            max-width: 220px;
            max-height: 220px;
            width: 100%;
            height: auto;
            display: block;
          }
        `}</style>
			</head>
			<body>
				<div className='qr-box'>
					{ssid ? (
						<>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
								<Wifi className='text-primary w-4 h-4' />
							</div>
							<div className='ssid'>{ssid}</div>
						</>
					) : null}
					<img id='qr-img' src={dataUrl} alt='Wi-Fi QR Code' />
				</div>
			</body>
		</html>
	)
}
