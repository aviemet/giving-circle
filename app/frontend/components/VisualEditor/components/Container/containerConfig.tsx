import { Slot, type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { ContainerDisplay } from "./Container"
import {
	alignmentField,
	backgroundField,
	borderField,
	boxModelField,
	defaultBackgroundValue,
	defaultBorderValue,
	flexField,
	flexItemSizingField,
	normalizeBackgroundValue,
	normalizeBorderValue,
	type AlignmentValue,
	type BackgroundValue,
	type BorderProps,
	type BoxModelValue,
	type DimensionStyleProps,
	type FlexItemSizing,
	type FlexStyleInput,
	type SpacingProps,
} from "../../fields"

export type ContainerProps = SpacingProps & DimensionStyleProps & FlexStyleInput & BorderProps & {
	background?: BackgroundValue
	backgroundColor?: string
	border?: BorderProps
	content: Slot
	alignment: AlignmentValue
	sizing?: FlexItemSizing
	spacing?: BoxModelValue
}

const t = i18n.t.bind(i18n)

export const containerConfig: ComponentConfig<ContainerProps> = {
	label: t("slides.editor.components.container.label"),
	inline: true,
	fields: {
		sizing: flexItemSizingField(),
		spacing: boxModelField(),
		background: backgroundField(),
		border: borderField(),
		flex: flexField(),
		content: { type: "slot" },
		alignment: alignmentField({
			label: t("slides.editor.components.container.alignment"),
		}),
	},
	defaultProps: {
		content: [],
		alignment: "left",
		sizing: { mode: "fill" },
		spacing: {
			margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
			padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
		},
		background: defaultBackgroundValue(""),
		border: defaultBorderValue(),
		flex: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "nowrap",
			alignItems: "stretch",
			justifyContent: "flex-start",
			overflow: "hidden",
			gap: 0,
		},
	},
	resolveData: ({ props }) => {
		return {
			props: {
				...props,
				background: normalizeBackgroundValue(props.background, {
					color: props.backgroundColor,
				}),
				border: normalizeBorderValue(props.border, {
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius,
					borderColor: props.borderColor,
				}),
			},
		}
	},
	render: (props) => <ContainerDisplay { ...props } />,
}
