import type { FC } from 'react'

import { Footer } from '@molecules/footer'
import { Header } from '@molecules/header'
import { LanguageSelector } from '@molecules/language-selector'
import { ThemeToggler } from '@molecules/theme-toggler'
import { WiFiQRGenerator } from '@organism/wifi-qr-generator'

export const HomePage: FC = () => {
	return (
		<div className='min-h-dvh w-full bg-base dark:bg-base-100 relative'>
			<div className='absolute inset-0 z-0 bg-wifiqr-gradient'>
				<div className='h-full w-full bg-wifiqr-pattern-gradient' />
			</div>
			<div className='min-h-dvh bg-transparent relative'>
				<Header />
				<div className='min-h-[calc(100dvh-calc(var(--spacing)*24))] md:mt-[calc(var(--spacing)*-8)] flex flex-col justify-center p-4'>
					<div className='max-w-4xl 3xl:max-w-7xl w-full mx-auto flex flex-col space-y-6'>
						<WiFiQRGenerator />
						<div className='fixed bottom-4 right-4 flex items-center gap-2 z-50'>
							<LanguageSelector />
							<ThemeToggler />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	)
}
