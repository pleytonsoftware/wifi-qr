'use client'

import { useEffect, useRef } from 'react'

import ms from 'ms'
import NProgress from 'nprogress'

import { usePathname } from '@/i18n/navigation'

const NPROGRESS_DELAY = ms('0.3s')
let timeout: NodeJS.Timeout | null = null
export function NProgressProvider() {
	const pathname = usePathname()
	const isInitialRender = useRef<boolean>(true)

	useEffect(() => {
		if (!isInitialRender.current) {
			NProgress.start()
			timeout = setTimeout(() => NProgress.done(), NPROGRESS_DELAY)
		} else {
			isInitialRender.current = false
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			NProgress.done()
		}
	}, [pathname])

	return null
}
