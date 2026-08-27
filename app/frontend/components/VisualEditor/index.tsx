import { Suspense } from "react"
import "@puckeditor/core/puck.css"

import { VisualEditorContent, type VisualEditorProps } from "./VisualEditorContent"

export type { PuckSlideData } from "./editorPersistence"
export type { SlideSaveExtras, VisualEditorProps } from "./VisualEditorContent"

export function VisualEditor(props: VisualEditorProps) {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<VisualEditorContent { ...props } />
		</Suspense>
	)
}
