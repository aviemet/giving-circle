import { Slot, type ComponentConfig } from "@measured/puck"

import { GridDisplay } from "./Grid"

export type GridProps = {
	content: Slot
	columns: number
}

export const gridConfig: ComponentConfig<GridProps> = {
	label: "Grid",
	fields: {
		content: { type: "slot" },
		columns: { type: "number" },
	},
	defaultProps: {
		content: [],
		columns: 3,
	},
	render: (props) => <GridDisplay { ...props } />,
}
