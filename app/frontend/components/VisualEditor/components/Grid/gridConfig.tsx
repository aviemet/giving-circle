import { Slot, type ComponentConfig } from "@measured/puck"

import { i18n } from "@/lib/i18n"

import { GridDisplay } from "./Grid"

export type GridProps = {
	content: Slot
	columns: number
}

const t = i18n.t.bind(i18n)

export const gridConfig: ComponentConfig<GridProps> = {
	label: t("slides.editor.components.grid.label"),
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
