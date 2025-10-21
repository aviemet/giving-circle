import { useEffect, useCallback, useRef } from "react"

interface UseClickAwayListenerOptions {
	enabled?: boolean
	onMouseDown?: () => void
	onEscape?: () => void
}

export const useClickAwayListener = <T extends HTMLElement = HTMLElement>(
	ref: React.RefObject<T>,
	callback: () => void,
	options: UseClickAwayListenerOptions = {}
) => {
	const { enabled = true, onMouseDown, onEscape } = options
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const handleMouseDown = useCallback((e: MouseEvent) => {
		if(ref.current && !ref.current.contains(e.target as Node)) {
			if(onMouseDown) {
				onMouseDown()
			} else {
				callbackRef.current()
			}
		}
	}, [ref, onMouseDown])

	const handleEscKey = useCallback((e: KeyboardEvent) => {
		if(e.key === "Escape") {
			if(onEscape) {
				onEscape()
			} else {
				callbackRef.current()
			}
		}
	}, [onEscape])

	useEffect(() => {
		if(!enabled) return

		document.addEventListener("mousedown", handleMouseDown)
		document.addEventListener("keydown", handleEscKey)

		return () => {
			document.removeEventListener("mousedown", handleMouseDown)
			document.removeEventListener("keydown", handleEscKey)
		}
	}, [enabled, handleMouseDown, handleEscKey])
}
