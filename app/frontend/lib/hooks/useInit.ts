import { useEffect, useRef, type EffectCallback } from "react"

export const useInit = (setup: EffectCallback) => {
	const didRunRef = useRef<boolean>(false)
	const cleanupRef = useRef<void | (() => void)>(() => {})

	useEffect(() => {
		if(!didRunRef.current) {
			didRunRef.current = true
			cleanupRef.current = setup()
		}

		return cleanupRef.current
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
