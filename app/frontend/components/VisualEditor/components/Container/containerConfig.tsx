import { Slot, type ComponentConfig } from "@measured/puck"

import { ContainerDisplay } from "./Container"
import { type LayoutStyleProps } from "../../fields"
import {
	alignmentField,
	layoutStyleFields,
} from "../../fields"
import { type AlignmentValue } from "../../fields/alignment"

export type ContainerProps = LayoutStyleProps & {
	content: Slot
	alignment: AlignmentValue
}

export const containerConfig: ComponentConfig<ContainerProps> = {
	label: "Container",
	fields: {
		...layoutStyleFields(),
		content: { type: "slot" },
		alignment: alignmentField({
			label: "Alignment",
		}),
	},
	defaultProps: {
		content: [],
		alignment: "left",
		flex: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "nowrap",
		},
	},
	render: (props) => <ContainerDisplay { ...props } />,
}
