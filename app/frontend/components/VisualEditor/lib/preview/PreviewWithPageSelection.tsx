import clsx from "clsx"
import { useEffect, useRef, type ReactNode } from "react"

import { isSlideRootClickTarget } from "../SlideRoot"
import { useEditorPuck } from "../useEditorPuck"
import * as classes from "../../styles/Puck.css"

export function PreviewWithPageSelection({ children }: { children: ReactNode }) {
	const dispatch = useEditorPuck((state) => state.dispatch)
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
		<div
			ref={ previewRef }
			className={ clsx(classes.puckPreviewContainer) }
			data-slide-snapshot-host=""
		>
			{ children }
		</div>
	)
}
