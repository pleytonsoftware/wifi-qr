import { use } from 'react'

import { DrawerContext } from './drawer.context'

export const useDrawerContext = () => {
	const context = use(DrawerContext)

	if (!context) {
		throw new Error('useDrawer must be used within a DrawerProvider')
	}

	return context
}
