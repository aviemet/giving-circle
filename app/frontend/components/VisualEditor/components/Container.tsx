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
	padding: number
	alignment: AlignmentValue
}

export const containerConfig: ComponentConfig<ContainerProps> = {
	fields: {
		...layoutStyleFields(),
		content: { type: "slot" },
		padding: { type: "number" },
		alignment: alignmentField({
			label: "Alignment",
		}),
	},
	defaultProps: {
		content: [],
		padding: 16,
		alignment: "left",
		flexWrap: "wrap",
	},
	render: ({ content: Content, padding, alignment, puck, ...styleProps }) => {
		return (
			<Container
				ref={ puck.dragRef }
				className={ clsx("presentation_container") }
				component={ Content }
				p={ padding }
				ta={ alignment }
				style={ buildLayoutStyle(styleProps) }
			/>
		)
	},
}

