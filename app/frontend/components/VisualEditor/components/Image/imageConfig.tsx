import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

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

const t = i18n.t.bind(i18n)

export const imageConfig: ComponentConfig<ImageProps> = {
	label: t("slides.editor.components.image.label"),
	fields: {
		title: { type: "text" },
		src: imageField(),
		margin: { type: "number" },
		padding: { type: "number" },
		width: { type: "number" },
		height: { type: "number" },
		borderWidth: { type: "number" },
		borderColor: colorField({
			label: t("slides.editor.components.image.border_color"),
		}),
	},

	defaultProps: {
		title: t("slides.editor.components.image.default_title"),
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
