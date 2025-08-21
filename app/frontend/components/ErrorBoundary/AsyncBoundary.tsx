import { ComponentType, ErrorInfo, ReactNode, Suspense, useEffect, useState } from "react"

import Loading from "@/components/Loading"

import SuspenseErrorBoundary from "./SuspenseErrorBoundary"

interface SuspenseErrorBoundaryProps {
	children: ReactNode
	fallback?: ComponentType<{ error: Error, retry: () => void, retryCount: number }>
	maxRetries?: number
	onError?: (error: Error, errorInfo: ErrorInfo) => void
	resetKeys?: Array<string | number>
	resetOnPropsChange?: boolean
}

export interface AsyncBoundaryProps extends SuspenseErrorBoundaryProps {
	suspenseFallback?: ReactNode
	errorFallback?: ComponentType<{ error: Error, retry: () => void, retryCount: number }>
	loadingComponent?: ComponentType<any>
	loadingProps?: Record<string, any>
	minimumLoadingTime?: number
	isLoading?: boolean
}

const QueryLoadingWrapper: React.FC<{ isLoading?: boolean, children: ReactNode, fallback: ReactNode }> = ({
	isLoading,
	children,
	fallback,
}) => {
	if(isLoading) {
		return <>{ fallback }</>
	}
	return <>{ children }</>
}

const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
	children,
	suspenseFallback,
	errorFallback,
	loadingComponent: LoadingComp = Loading,
	loadingProps = {},
	minimumLoadingTime = 0,
	maxRetries = 3,
	onError,
	resetKeys,
	resetOnPropsChange = true,
	isLoading,
	...errorBoundaryProps
}) => {
	const [showFallback, setShowFallback] = useState(false)

	useEffect(() => {
		if(minimumLoadingTime > 0) {
			const timer = setTimeout(() => setShowFallback(true), minimumLoadingTime)
			return () => clearTimeout(timer)
		} else {
			setShowFallback(true)
		}
	}, [minimumLoadingTime])

	const defaultSuspenseFallback = suspenseFallback || (
		showFallback ? <LoadingComp { ...loadingProps } /> : <div />
	)

	return (
		<SuspenseErrorBoundary
			fallback={ errorFallback }
			maxRetries={ maxRetries }
			onError={ onError }
			resetKeys={ resetKeys }
			resetOnPropsChange={ resetOnPropsChange }
			{ ...errorBoundaryProps }
		>
			<QueryLoadingWrapper isLoading={ isLoading } fallback={ defaultSuspenseFallback }>
				<Suspense fallback={ defaultSuspenseFallback }>
					{ children }
				</Suspense>
			</QueryLoadingWrapper>
		</SuspenseErrorBoundary>
	)
}

export default AsyncBoundary
