// Default error fallback component
const DefaultErrorFallback: React.FC<{
	error: Error
	retry: () => void
	retryCount: number
}> = ({ error, retry, retryCount }) => {
	const isNetworkError = error.message.includes("fetch") || error.message.includes("network")
	const hasRetriedMultiple = retryCount > 2

	return (
		<div>
			<div>
				<div>
					{ isNetworkError ? "⚡" : "⚠️" }
				</div>

				<h3>
					{ isNetworkError ? "Connection Problem" : "Something went wrong" }
				</h3>

				<p>
					{ isNetworkError
						? "Unable to load content. Please check your connection."
						: hasRetriedMultiple
							? "This error persists after multiple attempts."
							: "An unexpected error occurred while loading this content."
					}
				</p>

				{ retryCount > 0 && (
					<p>
						Attempt { retryCount + 1 }
					</p>
				) }

				<div>
					<button
						onClick={ retry }
						disabled={ hasRetriedMultiple }
					>
						🔄 { hasRetriedMultiple ? "Max retries reached" : "Try again" }
					</button>
				</div>

				{ hasRetriedMultiple && (
					<p>
						Please refresh the page or contact support if this persists.
					</p>
				) }

				{ process.env.NODE_ENV === "development" && (
					<details>
						<summary>
							Error Details (Development)
						</summary>
						<pre>
							{ error.stack }
						</pre>
					</details>
				) }
			</div>
		</div>
	)
}

export default DefaultErrorFallback
