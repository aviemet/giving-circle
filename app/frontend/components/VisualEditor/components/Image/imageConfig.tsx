import { type ComponentConfig } from "@measured/puck"

import { ImageDisplay } from "./Image"
import { colorField, imageField } from "../../fields"

export type ImageProps = {
	title: string
	margin: number
	padding: number
	width: number
	height: number
	borderWidth: number
	borderColor: string
	src: string
}

export const imageConfig: ComponentConfig<ImageProps> = {
	label: "Image",
	fields: {
		title: { type: "text" },
		src: imageField(),
		margin: { type: "number" },
		padding: { type: "number" },
		width: { type: "number" },
		height: { type: "number" },
		borderWidth: { type: "number" },
		borderColor: colorField({
			label: "Border Color",
		}),
	},

	defaultProps: {
		title: "Image",
		src: "",
		margin: 4,
		padding: 0,
		width: 640,
		height: 480,
		borderWidth: 0,
		borderColor: "#0000",
	},

	render: (props) => <ImageDisplay { ...props } />,
}
