import clsx from "clsx"

import { Box } from "@/components"

import * as editorClasses from "./OrgsIterator.editor.css"
import { type OrgsIteratorComponentProps } from "./orgsIteratorConfig"
import * as puckClasses from "../../Puck.css"
import { slotDropZoneProps } from "../../slotEditor"

export function OrgsIteratorEditor({ content: Content }: OrgsIteratorComponentProps) {
	return (
		<Box className={ clsx(editorClasses.editor, puckClasses.presentationSlot) }>
			<Content
				className={ clsx(puckClasses.presentationSlot) }
				{ ...slotDropZoneProps() }
			/>
			<Box component="span" className={ clsx(editorClasses.hint) }>
				Repeats for each organization
			</Box>
		</Box>
	)
}
