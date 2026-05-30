import { Slot, type ComponentConfig } from "@measured/puck"

import { SimpleGrid } from "@/components"

import { presentationSlot } from "../Puck.css"
import { slotDropZoneProps } from "../slotEditor"

export type GridProps = {
	content: Slot
	columns: number
}

export const gridConfig: ComponentConfig<GridProps> = {
	fields: {
		content: { type: "slot" },
		columns: { type: "number" },
	},
	defaultProps: {
		content: [],
		columns: 3,
	},
	render: ({ content: Content, columns, puck }) => {
		return (
			<SimpleGrid
				ref={ puck.dragRef }
				className={ presentationSlot }
				cols={ columns }
				w="100%"
			>
				<Content
					className={ presentationSlot }
					{ ...slotDropZoneProps() }
				/>
			</SimpleGrid>
		)
	},
}

