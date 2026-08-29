import "@puckeditor/core/puck.css"

import { VisualEditorContent, type VisualEditorProps } from "./VisualEditorContent"

export type { PuckSlideData } from "./editorPersistence"
export type { SlideSaveExtras, VisualEditorProps } from "./VisualEditorContent"

export function VisualEditor(props: VisualEditorProps) {
	return <VisualEditorContent { ...props } />
}
