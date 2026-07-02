import { type TFunction } from "i18next"
import { type CSSProperties } from "react"

import { i18n } from "@/lib/i18n"

import { optionalColorField } from "./color"
import { spacingField, type SpacingGroup } from "./spacing"

export type SpacingProps = {
	margin?: SpacingGroup
	padding?: SpacingGroup
}

export type BorderProps = {
	borderWidth: number
	borderRadius: number
	borderColor: string
}

export type FlexProps = {
	display: "block" | "flex"
	flexDirection: "row" | "column"
	flexWrap: "nowrap" | "wrap"
	overflow: "visible" | "auto" | "hidden"
	justifyContent: "flex-start" | "center" | "space-between" | "space-around" | "flex-end"
	alignItems: "flex-start" | "center" | "stretch" | "flex-end"
	gap: number
}

export type LayoutStyleProps = Partial<SpacingProps & BorderProps & {
	backgroundColor: string
	width: string
	minWidth: string
	minHeight: string
} & FlexProps> & {
	flex?: Partial<FlexProps>
}

function layoutText(t: TFunction, key: string) {
	return t(`slides.editor.fields.layout.${key}`)
}

function flexObjectFields(t: TFunction) {
	return {
		display: {
			type: "select" as const,
			label: layoutText(t, "labels.display"),
			options: [
				{ label: layoutText(t, "display.block"), value: "block" },
				{ label: layoutText(t, "display.flex"), value: "flex" },
			],
		},
		flexDirection: {
			type: "select" as const,
			label: layoutText(t, "labels.direction"),
			options: [
				{ label: layoutText(t, "direction.row"), value: "row" },
				{ label: layoutText(t, "direction.column"), value: "column" },
			],
		},
		flexWrap: {
			type: "select" as const,
			label: layoutText(t, "labels.wrap"),
			options: [
				{ label: layoutText(t, "wrap.nowrap"), value: "nowrap" },
				{ label: layoutText(t, "wrap.wrap"), value: "wrap" },
			],
		},
		justifyContent: {
			type: "select" as const,
			label: layoutText(t, "labels.justify"),
			options: [
				{ label: layoutText(t, "justify.start"), value: "flex-start" },
				{ label: layoutText(t, "justify.center"), value: "center" },
				{ label: layoutText(t, "justify.end"), value: "flex-end" },
				{ label: layoutText(t, "justify.space_between"), value: "space-between" },
				{ label: layoutText(t, "justify.space_around"), value: "space-around" },
			],
		},
		alignItems: {
			type: "select" as const,
			label: layoutText(t, "labels.align"),
			options: [
				{ label: layoutText(t, "align.start"), value: "flex-start" },
				{ label: layoutText(t, "align.center"), value: "center" },
				{ label: layoutText(t, "align.end"), value: "flex-end" },
				{ label: layoutText(t, "align.stretch"), value: "stretch" },
			],
		},
		gap: { type: "number" as const, label: layoutText(t, "labels.gap") },
		overflow: {
			type: "select" as const,
			label: layoutText(t, "labels.overflow"),
			options: [
				{ label: layoutText(t, "overflow.visible"), value: "visible" },
				{ label: layoutText(t, "overflow.auto_scroll"), value: "auto" },
				{ label: layoutText(t, "overflow.hidden"), value: "hidden" },
			],
		},
	}
}

export const layoutStyleFields = (t: TFunction = i18n.t.bind(i18n)) =>
	({
		margin: spacingField({ label: layoutText(t, "margin") }),
		padding: spacingField({ label: layoutText(t, "padding") }),
		backgroundColor: optionalColorField({ label: layoutText(t, "background_color") }),
		borderWidth: { type: "number" as const, label: layoutText(t, "border_width") },
		borderRadius: { type: "number" as const, label: layoutText(t, "border_radius") },
		borderColor: optionalColorField({ label: layoutText(t, "border_color") }),
		width: { type: "text" as const, label: layoutText(t, "width") },
		minWidth: { type: "text" as const, label: layoutText(t, "min_width") },
		minHeight: { type: "text" as const, label: layoutText(t, "min_height") },
		flex: {
			type: "object" as const,
			label: layoutText(t, "flex"),
			objectFields: flexObjectFields(t),
		},
	})

function dimensionValue(value: string): string {
	if(/^\d+$/.test(value)) {
		return `${value}px`
	}
	return value
}

function flexFromProps(props: LayoutStyleProps): Partial<FlexProps> {
	return props.flex ?? {
		display: props.display,
		flexDirection: props.flexDirection,
		flexWrap: props.flexWrap,
		overflow: props.overflow,
		justifyContent: props.justifyContent,
		alignItems: props.alignItems,
		gap: props.gap,
	}
}

function overflowStyle(flex: Partial<FlexProps>): CSSProperties {
	if(flex.overflow === undefined) {
		return {}
	}

	const style: CSSProperties = { overflow: flex.overflow }
	if(flex.overflow === "auto" || flex.overflow === "hidden") {
		style.minHeight = 0
	}
	return style
}

export const buildLayoutStyle = (props: LayoutStyleProps): CSSProperties => {
	const marginGroup = props.margin
	const paddingGroup = props.padding
	const flex = flexFromProps(props)

	return {
		...(marginGroup
			? {
				marginTop: marginGroup.top,
				marginRight: marginGroup.right,
				marginBottom: marginGroup.bottom,
				marginLeft: marginGroup.left,
			}
			: {}),
		...(paddingGroup
			? {
				paddingTop: paddingGroup.top,
				paddingRight: paddingGroup.right,
				paddingBottom: paddingGroup.bottom,
				paddingLeft: paddingGroup.left,
			}
			: {}),
		...(props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}),
		...(props.borderWidth !== undefined ? { borderWidth: props.borderWidth } : {}),
		...(props.borderRadius !== undefined ? { borderRadius: props.borderRadius } : {}),
		...(props.borderColor ? { borderColor: props.borderColor } : {}),
		...(props.width ? { width: dimensionValue(props.width) } : {}),
		...(props.minWidth ? { minWidth: dimensionValue(props.minWidth) } : {}),
		...(props.minHeight ? { minHeight: dimensionValue(props.minHeight) } : {}),
		...(flex.display ? { display: flex.display } : {}),
		...(flex.flexDirection ? { flexDirection: flex.flexDirection } : {}),
		...(flex.justifyContent ? { justifyContent: flex.justifyContent } : {}),
		...(flex.alignItems ? { alignItems: flex.alignItems } : {}),
		...(flex.flexWrap ? { flexWrap: flex.flexWrap } : {}),
		...(overflowStyle(flex)),
		...(flex.gap !== undefined ? { gap: flex.gap } : {}),
	}
}
