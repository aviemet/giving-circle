import React from 'react'
import Providers from './Providers'
import { Flash } from '@/components'

export { default as AppLayout } from './AppLayout'
export { default as PresentationLayout } from './PresentationLayout'
export { default as AuthLayout } from './AuthLayout'
export { default as PublicLayout } from './PublicLayout'

interface LayoutWrapperProps {
	children: any
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
	return (
		<Providers>
			<Flash />
			{ children }
		</Providers>
	)
}
