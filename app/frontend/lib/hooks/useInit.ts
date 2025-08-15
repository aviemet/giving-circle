import { useEffect } from "react"

export const useInit = (cb: Function, cleanup?: () => void) => {
	useEffect(() => {
		cb()

		return cleanup
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
