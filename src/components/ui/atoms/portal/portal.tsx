'use client'

import type { FC, ReactNode } from 'react'

import { createPortal } from 'react-dom'
import { useIsMounted } from 'usehooks-ts'

type PortalProps = {
	children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
	const isMounted = useIsMounted()

	if (!isMounted) return null

	return createPortal(children, document.body)
}
