import React, { ComponentType, ErrorInfo, ReactNode } from "react"

import DefaultErrorFallback from "./DefaultErrorFallback"

interface SuspenseErrorBoundaryProps {
	children: ReactNode
	fallback?: ComponentType<{ error: Error, retry: () => void, retryCount: number }>
	maxRetries?: number
	onError?: (error: Error, errorInfo: ErrorInfo) => void
	resetKeys?: Array<string | number>
	resetOnPropsChange?: boolean
}

interface ErrorBoundaryState {
	hasError: boolean
	error: Error | null
	errorInfo: ErrorInfo | null
	retryCount: number
}

// Enhanced Error Boundary with retry logic and reset capabilities
class SuspenseErrorBoundary extends React.Component<
  SuspenseErrorBoundaryProps,
  ErrorBoundaryState
> {
	private resetTimeoutId: number | null = null

	constructor(props: SuspenseErrorBoundaryProps) {
		super(props)
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
			retryCount: 0,
		}
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		return {
			hasError: true,
			error,
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState(prevState => ({
			errorInfo,
			retryCount: prevState.retryCount,
		}))

		this.props.onError?.(error, errorInfo)

		// Log to external service in production
		if(process.env.NODE_ENV === "production") {
			console.error("Suspense Error Boundary caught an error:", error, errorInfo)
		}
	}

	componentDidUpdate(prevProps: SuspenseErrorBoundaryProps) {
		const { resetKeys, resetOnPropsChange } = this.props
		const { hasError } = this.state

		if(hasError && resetKeys && prevProps.resetKeys !== resetKeys) {
			if(resetKeys.some(key => prevProps.resetKeys?.includes(key) === false)) {
				this.resetErrorBoundary()
			}
		}

		if(hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
			this.resetErrorBoundary()
		}
	}

	resetErrorBoundary = () => {
		if(this.resetTimeoutId) {
			clearTimeout(this.resetTimeoutId)
		}

		this.resetTimeoutId = window.setTimeout(() => {
			this.setState({
				hasError: false,
				error: null,
				errorInfo: null,
				retryCount: this.state.retryCount + 1,
			})
		}, 100)
	}

	componentWillUnmount() {
		if(this.resetTimeoutId) {
			clearTimeout(this.resetTimeoutId)
		}
	}

	render() {
		if(this.state.hasError && this.state.error) {
			const { maxRetries = 3 } = this.props
			const canRetry = this.state.retryCount < maxRetries

			const FallbackComponent = this.props.fallback || DefaultErrorFallback

			return (
				<FallbackComponent
					error={ this.state.error }
					retry={ canRetry ? this.resetErrorBoundary : () => {} }
					retryCount={ this.state.retryCount }
				/>
			)
		}

		return this.props.children
	}
}

export default SuspenseErrorBoundary
