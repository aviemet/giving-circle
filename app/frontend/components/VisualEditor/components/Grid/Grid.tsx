import { type PuckContext, type SlotComponent } from "@puckeditor/core"
import clsx from "clsx"

import { SimpleGrid } from "@/components"

import * as classes from "./Grid.css"
import * as editorClasses from "./Grid.editor.css"
import { GridProps } from "./gridConfig"
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
	puck,
}: GridComponentProps) {
	const { dragRef, isEditing } = puck

	return (
		<SimpleGrid
			ref={ dragRef }
			className={ gridClassName(isEditing) }
			cols={ columns }
			w="100%"
		>
			<Content
				className={ gridDropZoneClassName(isEditing) }
				{ ...slotDropZoneProps() }
			/>
		</SimpleGrid>
	)
}
