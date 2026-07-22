import { createUsePuck } from "@measured/puck"
import clsx from "clsx"
import { useEffect, useRef, type ReactNode } from "react"

import { isSlideRootClickTarget } from "./components/SlideRoot/slideRootSelection"
import * as classes from "./Puck.css"

const usePuck = createUsePuck()

export function PreviewWithPageSelection({ children }: { children: ReactNode }) {
	const dispatch = usePuck((state) => state.dispatch)
	const previewRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const preview = previewRef.current
		if(!preview) return

		const handleClick = (event: Event) => {
			if(!isSlideRootClickTarget(event.target)) return

			dispatch({ type: "setUi", ui: { itemSelector: null } })
		}

		preview.addEventListener("click", handleClick, true)

		return () => {
			preview.removeEventListener("click", handleClick, true)
		}
	}, [dispatch])

	return (
		<div ref={ previewRef } className={ clsx(classes.puckPreviewContainer) }>
			{ children }
		</div>
	)
}
