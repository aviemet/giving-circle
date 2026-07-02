import { Suspense } from "react"
import "@measured/puck/puck.css"

import { VisualEditorContent, type VisualEditorProps } from "./VisualEditorContent"

export type { VisualEditorProps }

export function VisualEditor(props: VisualEditorProps) {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<VisualEditorContent { ...props } />
		</Suspense>
	)
}
