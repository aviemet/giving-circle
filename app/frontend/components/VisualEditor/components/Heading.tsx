import { type ComponentConfig } from "@measured/puck"

import { Box, Title } from "@/components"

import { colorField } from "../fields"

export type HeadingProps = {
	title: string
	padding: number
	order: 1 | 2 | 3 | 4 | 5 | 6
	color: string
}

export const headingConfig: ComponentConfig<HeadingProps> = {
	fields: {
		title: { type: "text" },
		padding: { type: "number" },
		order: {
			type: "select",
			options: [
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
			],
		},
		color: colorField({
			label: "Text Color",
		}),
	},

	defaultProps: {
		title: "Heading",
		padding: 16,
		order: 1,
		color: "#FFFFFF",
	},

	render: ({ title, padding, order, color }) => (
		<Box p={ padding }>
			<Title order={ order } c={ color }>{ title }</Title>
		</Box>
	),
}
