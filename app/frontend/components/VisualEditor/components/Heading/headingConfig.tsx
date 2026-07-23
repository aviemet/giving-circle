import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { HeadingDisplay } from "./Heading"
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
	type AlignmentValue,
	type FontStyleValue,
	type FontWeightValue,
	type HeadingMetricsValue,
	type HeadingOrder,
	type TextDecorationValue,
	type TextFlowValue,
	type TextFontValue,
	type TextTransformValue,
	type TextWrapValue,
	type TitleSizeValue,
	type TypeStyleValue,
} from "../../fields"

export type HeadingProps = {
	title: string
	metrics?: HeadingMetricsValue
	order?: HeadingOrder
	size?: TitleSizeValue
	padding?: number
	color?: string
	font?: TextFontValue
	typeStyle?: TypeStyleValue
	fw?: FontWeightValue
	td?: TextDecorationValue
	tt?: TextTransformValue
	fs?: FontStyleValue
	alignment: AlignmentValue
	flow?: TextFlowValue
	lineClamp?: number
	textWrap?: TextWrapValue
}

const t = i18n.t.bind(i18n)

export const headingConfig: ComponentConfig<HeadingProps> = {
	label: t("slides.editor.components.heading.label"),
	fields: {
		title: tagsField({
			label: t("slides.editor.components.heading.title"),
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
			label: t("slides.editor.components.heading.alignment"),
		}),
		flow: textFlowField(),
	},

	defaultProps: {
		title: t("slides.editor.components.heading.default_title"),
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
		const legacySize = typeof props.size === "string"
			? props.size
			: undefined
		const legacyMetricsSize = props.metrics !== undefined && "size" in props.metrics
			? String(props.metrics.size)
			: undefined

		return {
			props: {
				...props,
				metrics: normalizeHeadingMetrics(props.metrics, {
					order: props.order,
					padding: props.padding,
				}),
				font: normalizeTextFontValue(
					props.font,
					{
						font: props.font,
						color: props.color,
						size: legacySize ?? legacyMetricsSize,
					},
					{
						color: "#FFFFFF",
						sizePreset: "auto",
					},
				),
				typeStyle: normalizeTypeStyle(props.typeStyle, {
					fw: props.fw,
					td: props.td,
					tt: props.tt,
					fs: props.fs,
				}, 700),
				flow: normalizeTextFlow(props.flow, {
					lineClamp: props.lineClamp,
					textWrap: props.textWrap,
				}),
			},
		}
	},

	render: (props) => <HeadingDisplay { ...props } />,
}
