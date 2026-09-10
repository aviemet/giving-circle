import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Heading, type HeadingProps } from "./Heading"
import {
	alignmentField,
	defaultHeadingMetrics,
	defaultTextFlow,
	defaultTextFontValue,
	defaultTypeStyle,
	headingMetricsField,
	normalizeHeadingMetrics,
	normalizeTextFlow,
	normalizeTextFontValue,
	normalizeTypeStyle,
	tagsField,
	textFlowField,
	textFontField,
	typeStyleField,
} from "../../fields"

export const headingConfig: ComponentConfig<HeadingProps> = {
	label: i18n.t("slides.editor.components.heading.label"),
	fields: {
		title: tagsField({
			label: i18n.t("slides.editor.components.heading.title"),
		}),
		metrics: headingMetricsField(),
		font: textFontField({
			allowInherit: true,
			allowAutoSize: true,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "auto",
		}),
		typeStyle: typeStyleField({ fallbackWeight: 700 }),
		alignment: alignmentField({
			label: i18n.t("slides.editor.components.heading.alignment"),
		}),
		flow: textFlowField(),
	},

	defaultProps: {
		title: i18n.t("slides.editor.components.heading.default_title"),
		metrics: defaultHeadingMetrics(),
		font: defaultTextFontValue({
			color: "#FFFFFF",
			sizePreset: "auto",
		}),
		typeStyle: defaultTypeStyle(700),
		alignment: "left",
		flow: defaultTextFlow(),
	},

	resolveData: ({ props }) => {
		return {
			props: {
				...props,
				metrics: normalizeHeadingMetrics(props.metrics),
				font: normalizeTextFontValue(props.font, {
					color: "#FFFFFF",
					sizePreset: "auto",
				}),
				typeStyle: normalizeTypeStyle(props.typeStyle, 700),
				flow: normalizeTextFlow(props.flow),
			},
		}
	},

	render: (props) => <Heading { ...props } />,
}
