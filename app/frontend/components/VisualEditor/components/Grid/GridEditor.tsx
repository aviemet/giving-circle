import clsx from "clsx"

import { Box } from "@/components"

import { buildGridEditorStyle } from "./buildGridStyle"
import { type GridComponentProps } from "./Grid"
import * as classes from "./Grid.css"
import * as editorClasses from "./Grid.editor.css"
import { normalizeGridLayoutValue } from "../../fields/grid"
import { isIterateOn, IterateHint } from "../../fields/iterate"
import * as iterateEditorClasses from "../../fields/iterate/iterate.editor.css"
import { slotDropZoneProps } from "../../lib/slotEditor"
import * as layoutChrome from "../../styles/layoutChrome.editor.css"
import * as puckClasses from "../../styles/Puck.css"

export function GridEditor({
	content: Content,
	grid,
	sizing,
	puck,
	iterate,
	...styleProps
}: GridComponentProps) {
	const { dragRef } = puck
	const iterating = isIterateOn(iterate)
	const layout = normalizeGridLayoutValue(grid)

	const gridProps = {
		style: buildGridEditorStyle(styleProps, layout, sizing),
		ref: dragRef,
		"data-center-last-row": layout.centerLastRow ? "true" : "false",
		w: "100%",
		className: clsx(
			classes.grid,
			editorClasses.grid,
			puckClasses.presentationSlot,
			layoutChrome.frame,
			layoutChrome.labelGrid,
		),
	}

	if(iterating) {
		return (
			<Box { ...gridProps }>
				<Content
					className={ clsx(puckClasses.presentationSlot, iterateEditorClasses.iterateSlot) }
					{ ...slotDropZoneProps() }
				/>
				<IterateHint iterate={ iterate } />
			</Box>
		)
	}

	return (
		<Box
			component={ Content }
			{ ...gridProps }
			{ ...slotDropZoneProps() }
		/>
	)
}
