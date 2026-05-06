import { type CSSProperties } from "react"

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
} & FlexProps> & {
	flex?: Partial<FlexProps>
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
	} as Partial<FlexProps>
}

function overflowStyle(flex: Partial<FlexProps>): CSSProperties {
	if(flex.overflow !== undefined) {
		return { overflow: flex.overflow }
	}
	if(flex.display === "flex") {
		return { overflow: "auto", minHeight: 0 }
	}
	return {}
}

const flexObjectFields = {
	display: {
		type: "select" as const,
		label: "Display",
		options: [
			{ label: "Block", value: "block" },
			{ label: "Flex", value: "flex" },
		],
	},
	flexDirection: {
		type: "select" as const,
		label: "Direction",
		options: [
			{ label: "Row", value: "row" },
			{ label: "Column", value: "column" },
		],
	},
	flexWrap: {
		type: "select" as const,
		label: "Wrap",
		options: [
			{ label: "Nowrap", value: "nowrap" },
			{ label: "Wrap", value: "wrap" },
		],
	},
	justifyContent: {
		type: "select" as const,
		label: "Justify",
		options: [
			{ label: "Start", value: "flex-start" },
			{ label: "Center", value: "center" },
			{ label: "End", value: "flex-end" },
			{ label: "Space Between", value: "space-between" },
			{ label: "Space Around", value: "space-around" },
		],
	},
	alignItems: {
		type: "select" as const,
		label: "Align",
		options: [
			{ label: "Start", value: "flex-start" },
			{ label: "Center", value: "center" },
			{ label: "End", value: "flex-end" },
			{ label: "Stretch", value: "stretch" },
		],
	},
	gap: { type: "number" as const, label: "Gap" },
	overflow: {
		type: "select" as const,
		label: "Overflow",
		options: [
			{ label: "Visible", value: "visible" },
			{ label: "Auto (scroll)", value: "auto" },
			{ label: "Hidden", value: "hidden" },
		],
	},
}

export const layoutStyleFields = () =>
	({
		margin: spacingField({ label: "Margin" }),
		padding: spacingField({ label: "Padding" }),
		backgroundColor: optionalColorField({ label: "Background Color" }),
		borderWidth: { type: "number" as const, label: "Border Width" },
		borderRadius: { type: "number" as const, label: "Border Radius" },
		borderColor: optionalColorField({ label: "Border Color" }),
		width: { type: "text" as const, label: "Width" },
		minWidth: { type: "text" as const, label: "Min Width" },
		flex: {
			type: "object" as const,
			label: "Flex",
			objectFields: flexObjectFields,
		},
	})

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
		...(props.width ? { width: props.width } : {}),
		...(props.minWidth ? { minWidth: props.minWidth } : {}),
		...(flex.display ? { display: flex.display } : {}),
		...(flex.flexDirection ? { flexDirection: flex.flexDirection } : {}),
		...(flex.justifyContent ? { justifyContent: flex.justifyContent } : {}),
		...(flex.alignItems ? { alignItems: flex.alignItems } : {}),
		...(flex.flexWrap ? { flexWrap: flex.flexWrap } : {}),
		...(overflowStyle(flex)),
		...(flex.gap !== undefined ? { gap: flex.gap } : {}),
	}
}

