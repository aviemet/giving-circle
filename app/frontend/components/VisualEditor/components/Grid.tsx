import { Slot, type ComponentConfig } from "@measured/puck"

import { SimpleGrid } from "@/components"

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
	render: ({ content: Content, columns }) => {
		return (
			<SimpleGrid
				component={ Content }
				cols={ columns }
			/>
		)
	},
}

