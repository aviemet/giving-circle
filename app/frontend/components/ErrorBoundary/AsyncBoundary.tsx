import { ComponentType, ReactNode, Suspense, useEffect, useState } from "react"

import { Loading } from "@/components/Loading"

import { SuspenseErrorBoundary, SuspenseErrorBoundaryProps } from "./SuspenseErrorBoundary"

interface QueryLoadingWrapperProps {
	isLoading?: boolean
	children: ReactNode
	fallback: ReactNode
}

function QueryLoadingWrapper({
	isLoading,
	children,
	fallback,
}: QueryLoadingWrapperProps) {
	return isLoading
		? <>{ fallback }</>
		: <>{ children }</>
}

export interface AsyncBoundaryProps extends SuspenseErrorBoundaryProps {
	suspenseFallback?: ReactNode
	errorFallback?: ComponentType<{ error: Error, retry: () => void, retryCount: number }>
	loadingComponent?: ComponentType<any>
	loadingProps?: Record<string, any>
	minimumLoadingTime?: number
	isLoading?: boolean
}

export function AsyncBoundary({
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
}: AsyncBoundaryProps) {
	const [showFallback, setShowFallback] = useState(false)

	useEffect(() => {
		if(minimumLoadingTime > 0) {
			const timer = setTimeout(() => setShowFallback(true), minimumLoadingTime)
			return () => clearTimeout(timer)
		}

		const timer = setTimeout(() => setShowFallback(true), 0)

		return () => clearTimeout(timer)
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

