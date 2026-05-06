import { useEffect, useRef } from "react"

export const useInit = (cb: Function, cleanup?: () => void) => {
	const runOnceRef = useRef<boolean>(true)

	useEffect(() => {
		if(runOnceRef) {
			cb()
			runOnceRef.current = false
		}

		return cleanup
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
