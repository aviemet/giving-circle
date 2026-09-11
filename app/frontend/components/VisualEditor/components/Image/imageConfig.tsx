import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Image, type ImageProps } from "./Image"
import {
	alignmentField,
	borderField,
	boxModelField,
	defaultBorderValue,
	defaultImageSize,
	imageField,
	imageSizeField,
	normalizeBorderValue,
	normalizeBoxModelValue,
	normalizeImageSize,
} from "../../fields"

export const imageConfig: ComponentConfig<ImageProps> = {
	label: i18n.t("slides.editor.components.image.label"),
	inline: true,
	fields: {
		title: {
			type: "text",
			label: i18n.t("slides.editor.components.image.title"),
		},
		src: imageField(),
		size: imageSizeField(),
		spacing: boxModelField(),
		border: borderField(),
		alignment: alignmentField({
			label: i18n.t("slides.editor.components.image.alignment"),
		}),
	},

	defaultProps: {
		title: i18n.t("slides.editor.components.image.default_title"),
		src: "",
		alignment: "left",
		size: defaultImageSize(),
		spacing: {
			margin: { top: 4, right: 4, bottom: 4, left: 4, unit: "px" },
			padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
		},
		border: defaultBorderValue(),
	},

	resolveData: ({ props }) => {
		return {
			props: {
				...props,
				alignment: props.alignment ?? "left",
				size: normalizeImageSize(props.size),
				spacing: normalizeBoxModelValue(props.spacing),
				border: normalizeBorderValue(props.border),
			},
		}
	},

	render: (props) => <Image { ...props } />,
}
