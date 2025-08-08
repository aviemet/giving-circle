import { Slot, type ComponentConfig } from "@measured/puck"

import { Container } from "@/components"

import { alignmentField } from "../fields"
import { AlignmentValue } from "../fields/alignment"

export type ContainerProps = {
	content: Slot
	padding: number
	alignment: AlignmentValue
}

export const containerConfig: ComponentConfig<ContainerProps> = {
	fields: {
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
	},
	render: ({ content: Content, padding, alignment }) => {
		return (
			<Container
				component={ Content }
				p={ padding }
				ta={ alignment }
			/>
		)
	},
}

