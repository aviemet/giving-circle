import { ComponentType } from "react"

import AsyncBoundary, { AsyncBoundaryProps } from "./AsyncBoundary"

// HOC for wrapping components with AsyncBoundary
const withAsyncBoundary = <P extends object>(
	Component: ComponentType<P>,
	options: Omit<AsyncBoundaryProps, "children"> = {}
) => {
	const WrappedComponent = (props: P) => (
		<AsyncBoundary { ...options }>
			<Component { ...props } />
		</AsyncBoundary>
	)

	WrappedComponent.displayName = `withAsyncBoundary(${Component.displayName || Component.name})`
	return WrappedComponent
}

export default withAsyncBoundary
