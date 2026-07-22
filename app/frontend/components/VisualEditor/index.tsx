import { type Data } from "@puckeditor/core"
import { Suspense } from "react"
import "@puckeditor/core/puck.css"

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
