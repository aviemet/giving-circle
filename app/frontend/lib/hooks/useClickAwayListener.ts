import { useEffect, useCallback, useRef, type RefObject } from "react"

interface UseClickAwayListenerOptions {
	enabled?: boolean
	onMouseDown?: () => void
	onEscape?: () => void
}

export const useClickAwayListener = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	callback: () => void,
	options: UseClickAwayListenerOptions = {}
) => {
	const { enabled = true, onMouseDown, onEscape } = options
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const handleMouseDown = useCallback((e: MouseEvent) => {
		const target = e.target
		if(ref.current !== null && target instanceof Node && !ref.current.contains(target)) {
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
