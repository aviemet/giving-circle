import { type PuckContext, type SlotComponent } from "@puckeditor/core"
import clsx from "clsx"

import { Box } from "@/components"
import { usePresentationDataContext } from "@/features/presentation"

import { buildGridStyle } from "./buildGridStyle"
import * as classes from "./Grid.css"
import * as editorClasses from "./Grid.editor.css"
import { GridProps } from "./gridConfig"
import * as iterateEditorClasses from "../../fields/iterate/iterate.editor.css"
import {
	getIterateItems,
	isIterateOn,
	IterateHint,
	normalizeGridLayoutValue,
	ORG_ITERATE_PATH_PREFIX,
	RepeatedSlot,
} from "../../fields"
import * as layoutChrome from "../../layoutChrome.editor.css"
import * as puckClasses from "../../Puck.css"
import { slotDropZoneProps } from "../../slotEditor"

export type GridComponentProps = Omit<GridProps, "content"> & {
	content: SlotComponent
	puck: PuckContext
}

export function gridClassName(isEditing: boolean) {
	return clsx(
		classes.grid,
		isEditing && editorClasses.grid,
		isEditing && puckClasses.presentationSlot,
	)
}

export function gridDropZoneClassName(isEditing: boolean) {
	return clsx(
		gridClassName(isEditing),
		isEditing && layoutChrome.frame,
		isEditing && layoutChrome.labelGrid,
	)
}

export function GridDisplay({
	content: Content,
	columns,
	grid,
	sizing,
	puck,
	iterate,
	...styleProps
}: GridComponentProps) {
	const { dragRef, isEditing } = puck
	const contextData = usePresentationDataContext()
	const iterating = isIterateOn(iterate)
	const items = getIterateItems(contextData, iterate)
	const layout = normalizeGridLayoutValue(grid, { columns })
	const style = buildGridStyle(styleProps, layout, sizing, isEditing)
	const className = iterating && !isEditing
		? gridClassName(isEditing)
		: gridDropZoneClassName(isEditing)

	if(isEditing && iterating) {
		return (
			<Box
				ref={ dragRef }
				className={ className }
				w="100%"
				style={ style }
				data-center-last-row={ layout.centerLastRow ? "true" : "false" }
			>
				<Content
					className={ clsx(puckClasses.presentationSlot, iterateEditorClasses.iterateSlot) }
					{ ...slotDropZoneProps() }
				/>
				<IterateHint />
			</Box>
		)
	}

	if(!isEditing && iterating) {
		return (
			<Box
				ref={ dragRef }
				className={ className }
				w="100%"
				style={ style }
				data-center-last-row={ layout.centerLastRow ? "true" : "false" }
			>
				<RepeatedSlot
					content={ Content }
					items={ items }
					pathPrefix={ ORG_ITERATE_PATH_PREFIX }
					className={ classes.iterateCell }
				/>
			</Box>
		)
	}

	return (
		<Box
			ref={ dragRef }
			component={ Content }
			className={ className }
			w="100%"
			style={ style }
			data-center-last-row={ layout.centerLastRow ? "true" : "false" }
			{ ...slotDropZoneProps() }
		/>
	)
}
