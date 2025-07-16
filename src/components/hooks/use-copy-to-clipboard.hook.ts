'use client'

import { useCallback, useState, useRef } from 'react'

import ms from 'ms'

type CopiedValue = string | null
type CopyFn = (text: string, timeoutMs?: ms.StringValue) => Promise<boolean>
type CopySupported = boolean
type UseCopyToClipboardParams = {
	defaultTimeoutMs?: ms.StringValue
}
type UseCopyToClipboardReturn = [CopiedValue, CopyFn, CopySupported]

export function useCopyToClipboard({ defaultTimeoutMs }: UseCopyToClipboardParams = {}): UseCopyToClipboardReturn {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const isClipboardSupported = typeof navigator !== 'undefined' && !!navigator.clipboard

	const copy: CopyFn = useCallback(
		async (text, timeoutMs = defaultTimeoutMs) => {
			if (!isClipboardSupported) {
				return false
			}

			try {
				await navigator.clipboard.writeText(text)
				setCopiedText(text)

				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}

				const timeoutDuration = timeoutMs && ms(timeoutMs)
				if (timeoutDuration && timeoutDuration > 0) {
					timeoutRef.current = setTimeout(() => {
						setCopiedText(null)
					}, timeoutDuration)
				}

				return true
			} catch {
				setCopiedText(null)
				return false
			}
		},
		[isClipboardSupported],
	)

	return [copiedText, copy, isClipboardSupported]
}
