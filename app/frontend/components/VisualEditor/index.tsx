import { Suspense } from "react"
import "@puckeditor/core/puck.css"

import { type PuckSlideData } from "./editorPersistence"
import { VisualEditorContent, type VisualEditorProps } from "./VisualEditorContent"

export type { VisualEditorProps, PuckSlideData }

export function VisualEditor(props: VisualEditorProps) {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<VisualEditorContent { ...props } />
		</Suspense>
	)
}
