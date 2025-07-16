import type { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const nextConfig: NextConfig = {
	turbo: {
		resolveAlias: {
			'@styles': path.resolve(__dirname, './src/styles'),
		},
	},
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
