import { type Data } from "@measured/puck"
import { Suspense } from "react"
import "@measured/puck/puck.css"

import { type PuckComponentProps, type SlideRootProps } from "./components"
import { VisualEditorContent, type VisualEditorProps } from "./VisualEditorContent"

export type { VisualEditorProps }

export type PuckSlideData = Partial<Data<PuckComponentProps, Partial<SlideRootProps>>>

export function VisualEditor(props: VisualEditorProps) {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<VisualEditorContent { ...props } />
		</Suspense>
	)
}
