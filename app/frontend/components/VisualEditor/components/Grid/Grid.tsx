import { type PuckContext, type SlotComponent } from "@measured/puck"

import { SimpleGrid } from "@/components"

import { GridProps } from "./gridConfig"
import * as classes from "../../Puck.css"
import { slotDropZoneProps } from "../../slotEditor"

export type GridComponentProps = Omit<GridProps, "content"> & {
	content: SlotComponent
	puck: PuckContext
}

export function GridDisplay({
	content: Content,
	columns,
	puck,
}: GridComponentProps) {
	const { dragRef } = puck

	return (
		<SimpleGrid
			ref={ dragRef }
			className={ classes.presentationSlot }
			cols={ columns }
			w="100%"
		>
			<Content
				className={ classes.presentationSlot }
				{ ...slotDropZoneProps() }
			/>
		</SimpleGrid>
	)
}
