import React, { useState, useEffect, type PropsWithChildren, useRef, type RefObject, type FC } from 'react'

import { cn } from '@cn'

import { X } from 'lucide-react'
import { useOnClickOutside } from 'usehooks-ts'

import { Icon } from '@atoms/icon'
import { Portal } from '@atoms/portal'

import { Button } from '..'

type BackdropModalProps = PropsWithChildren<{
	showBackdrop: boolean
	onClose: () => void
}>

export const BackdropModal: FC<BackdropModalProps> = ({ showBackdrop, onClose, children }) => {
	const [animationStage, setAnimationStage] = useState<'entering' | 'visible' | 'exiting' | null>(null)

	const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>

	const closeBackdrop = () => {
		setAnimationStage('exiting')
	}

	useEffect(() => {
		if (showBackdrop) setAnimationStage('entering')
	}, [showBackdrop])

	useEffect(() => {
		if (animationStage === 'entering') {
			const timer = setTimeout(() => {
				setAnimationStage('visible')
			}, 400) // match the blur animation time
			return () => clearTimeout(timer)
		}

		if (animationStage === 'exiting') {
			const timer = setTimeout(() => {
				onClose()
				setAnimationStage(null)
			}, 400) // match fade-out
			return () => clearTimeout(timer)
		}
	}, [animationStage])

	useOnClickOutside(ref, closeBackdrop)

	return (
		<Portal>
			{showBackdrop && (
				<div
					className={cn(
						'fixed inset-0 bg-black/60 z-50 flex justify-center items-center transition-all',
						animationStage === 'entering' && 'animate-blur-in',
						animationStage === 'exiting' && 'animate-fade-out',
						animationStage === 'visible' && 'backdrop-blur-sm',
					)}
				>
					<Button
						className='absolute top-4 right-4'
						variant='ghost'
						colour='neutral'
						shape='circle'
						onClick={closeBackdrop}
						aria-label='Close modal'
					>
						<Icon IconComponent={X} size='md' />
					</Button>
					{animationStage === 'visible' && (
						<div ref={ref} className='relative animate-fade-in'>
							{children}
						</div>
					)}
				</div>
			)}
		</Portal>
	)
}
