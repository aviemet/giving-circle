import { type ComponentConfig } from "@measured/puck"

import { Image } from "@/components"

import { colorField } from "../fields"

export type ImageProps = {
	title: string
	margin: number
	padding: number
	// border: boolean
	borderWidth: number
	borderColor: string
	src: string
}

export const imageConfig: ComponentConfig<ImageProps> = {
	fields: {
		title: { type: "text" },
		src: { type: "text" },
		margin: { type: "number" },
		padding: { type: "number" },
		// border: { type: "custom" },
		borderWidth: { type: "number" },
		borderColor: colorField,
	},

	defaultProps: {
		title: "Image",
		src: "",
		margin: 4,
		padding: 0,
		// border: false,
		borderWidth: 0,
		borderColor: "#0000",
	},

	render: ({
		title,
		src,
		margin,
		padding,
		borderWidth,
		borderColor,
	}) => {
		return (
			<Image
				src={ src || undefined }
				m={ margin }
				alt={ title }
			/>
		)
	},
}
