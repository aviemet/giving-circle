import { Slot, type ComponentConfig } from "@measured/puck"
import clsx from "clsx"

import { Container } from "@/components"

import {
	alignmentField,
	layoutStyleFields,
	type LayoutStyleProps,
} from "../fields"
import { type AlignmentValue } from "../fields/alignment"
import { buildLayoutStyle } from "../fields/layout"

export type ContainerProps = LayoutStyleProps & {
	content: Slot
	alignment: AlignmentValue
}

export const containerConfig: ComponentConfig<ContainerProps> = {
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
			flexDirection: "row",
			flexWrap: "wrap",
		},
	},
	render: ({ content: Content, alignment, puck, ...styleProps }) => {
		return (
			<Container
				ref={ puck.dragRef }
				className={ clsx("presentation_container") }
				component={ Content }
				ta={ alignment }
				style={ buildLayoutStyle(styleProps) }
			/>
		)
	},
}

