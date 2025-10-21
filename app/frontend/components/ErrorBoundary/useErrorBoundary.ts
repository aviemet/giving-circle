import { useCallback, useState } from "react"

// Hook for programmatic error boundary reset
const useErrorBoundary = () => {
	const [resetKey, setResetKey] = useState(0)

	const reset = useCallback(() => {
		setResetKey(prev => prev + 1)
	}, [])

	return { resetKey, reset }
}

export default useErrorBoundary
