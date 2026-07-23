import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { ImageDisplay } from "./Image"
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
	resolveImageSize,
	type AlignmentValue,
	type BorderProps,
	type BoxModelValue,
	type FlexItemSizing,
	type ImageSizeValue,
	type SpacingGroup,
} from "../../fields"

export type ImageProps = BorderProps & {
	title: string
	src: string
	alignment: AlignmentValue
	size?: ImageSizeValue
	spacing?: BoxModelValue
	border?: BorderProps
	sizing?: FlexItemSizing
	margin?: number
	padding?: number
	width?: number
	height?: number
}

const t = i18n.t.bind(i18n)

function uniformSpacing(value: number): SpacingGroup {
	return {
		top: value,
		right: value,
		bottom: value,
		left: value,
		unit: "px",
	}
}

function resolveImageSpacing(props: ImageProps): BoxModelValue {
	if(props.spacing) {
		return normalizeBoxModelValue(props.spacing)
	}

	return normalizeBoxModelValue({
		margin: typeof props.margin === "number" ? uniformSpacing(props.margin) : undefined,
		padding: typeof props.padding === "number" ? uniformSpacing(props.padding) : undefined,
	})
}

export const imageConfig: ComponentConfig<ImageProps> = {
	label: t("slides.editor.components.image.label"),
	inline: true,
	fields: {
		title: {
			type: "text",
			label: t("slides.editor.components.image.title"),
		},
		src: imageField(),
		size: imageSizeField(),
		spacing: boxModelField(),
		border: borderField(),
		alignment: alignmentField({
			label: t("slides.editor.components.image.alignment"),
		}),
	},

	defaultProps: {
		title: t("slides.editor.components.image.default_title"),
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
				size: resolveImageSize(props),
				spacing: resolveImageSpacing(props),
				border: normalizeBorderValue(props.border, {
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius,
					borderColor: props.borderColor,
				}),
			},
		}
	},

	render: (props) => <ImageDisplay { ...props } />,
}
