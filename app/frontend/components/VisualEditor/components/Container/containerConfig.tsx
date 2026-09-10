import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Container, type ContainerProps } from "./Container"
import {
	alignmentField,
	backgroundField,
	borderField,
	boxModelField,
	defaultBackgroundValue,
	defaultBorderValue,
	flexField,
	flexItemSizingField,
	iterateField,
	ITERATE_NONE,
	normalizeBackgroundValue,
	normalizeBorderValue,
	normalizeIterateValue,
} from "../../fields"

export const containerConfig: ComponentConfig<ContainerProps> = {
	label: i18n.t("slides.editor.components.container.label"),
	inline: true,
	fields: {
		iterate: iterateField(),
		sizing: flexItemSizingField(),
		spacing: boxModelField(),
		background: backgroundField(),
		border: borderField(),
		flex: flexField(),
		content: { type: "slot" },
		alignment: alignmentField({
			label: i18n.t("slides.editor.components.container.alignment"),
		}),
	},

	defaultProps: {
		content: [],
		alignment: "left",
		iterate: ITERATE_NONE,
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
				iterate: normalizeIterateValue(props.iterate),
				background: normalizeBackgroundValue(props.background),
				border: normalizeBorderValue(props.border),
			},
		}
	},
	render: (props) => <Container { ...props } />,
}
