import { type ComponentConfig } from "@measured/puck"

import { Image } from "@/components"
import placeholderImage from "@/images/placeholder_image.jpeg"

import { isNonEmptyString } from "../../../lib/strings"
import { colorField } from "../fields"
import imageField from "../fields/image"


export type ImageProps = {
	title: string
	margin: number
	padding: number
	width: number
	height: number
	// border: boolean
	borderWidth: number
	borderColor: string
	src: string
}

export const imageConfig: ComponentConfig<ImageProps> = {
	fields: {
		title: { type: "text" },
		src: imageField(),
		margin: { type: "number" },
		padding: { type: "number" },
		width: { type: "number" },
		height: { type: "number" },
		// border: { type: "custom" },
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
		// border: false,
		borderWidth: 0,
		borderColor: "#0000",
	},

	render: ({
		title,
		src,
		margin,
		width,
		height,
		padding,
		borderWidth,
		borderColor,
	}) => {
		return (
			<Image
				src={ isNonEmptyString(src) ? src : placeholderImage }
				m={ margin }
				p={ padding }
				alt={ title }
				width={ width }
				height={ height }
			/>
		)
	},
}
