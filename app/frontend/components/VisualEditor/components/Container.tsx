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
import { presentationSlot } from "../Puck.css"
import { slotDropZoneProps } from "../slotEditor"

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
				className={ clsx("presentation_container", presentationSlot) }
				ta={ alignment }
				w="100%"
				style={ buildLayoutStyle(styleProps) }
			>
				<Content
					className={ presentationSlot }
					{ ...slotDropZoneProps() }
				/>
			</Container>
		)
	},
}

