import React from "react"

import { Flash } from "@/components"

import Providers from "./Providers"

export { default as AppLayout } from "./AppLayout"
export { default as PresentationLayout } from "./PresentationLayout"
export { default as AuthLayout } from "./AuthLayout"
export { default as PublicLayout } from "./PublicLayout"

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
