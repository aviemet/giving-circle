import { type CSSProperties } from "react"

import { optionalColorField } from "./color"

export type SpacingProps = {
	marginTop: number
	marginRight: number
	marginBottom: number
	marginLeft: number
	paddingTop: number
	paddingRight: number
	paddingBottom: number
	paddingLeft: number
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

export type LayoutStyleProps = Partial<SpacingProps & BorderProps & FlexProps & {
	backgroundColor: string
}>

function overflowStyle(props: LayoutStyleProps): CSSProperties {
	if(props.overflow !== undefined) {
		return { overflow: props.overflow }
	}
	if(props.display === "flex") {
		return { overflow: "auto", minHeight: 0 }
	}
	return {}
}

export const layoutStyleFields = () =>
	({
		marginTop: { type: "number" as const, label: "Margin Top" },
		marginRight: { type: "number" as const, label: "Margin Right" },
		marginBottom: { type: "number" as const, label: "Margin Bottom" },
		marginLeft: { type: "number" as const, label: "Margin Left" },
		paddingTop: { type: "number" as const, label: "Padding Top" },
		paddingRight: { type: "number" as const, label: "Padding Right" },
		paddingBottom: { type: "number" as const, label: "Padding Bottom" },
		paddingLeft: { type: "number" as const, label: "Padding Left" },
		backgroundColor: optionalColorField({ label: "Background Color" }),
		borderWidth: { type: "number" as const, label: "Border Width" },
		borderRadius: { type: "number" as const, label: "Border Radius" },
		borderColor: optionalColorField({ label: "Border Color" }),
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
			label: "Flex Direction",
			options: [
				{ label: "Row", value: "row" },
				{ label: "Column", value: "column" },
			],
		},
		justifyContent: {
			type: "select" as const,
			label: "Justify Content",
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
			label: "Align Items",
			options: [
				{ label: "Start", value: "flex-start" },
				{ label: "Center", value: "center" },
				{ label: "End", value: "flex-end" },
				{ label: "Stretch", value: "stretch" },
			],
		},
		flexWrap: {
			type: "select" as const,
			label: "Flex Wrap",
			options: [
				{ label: "Overflow", value: "nowrap" },
				{ label: "Wrap", value: "wrap" },
			],
		},
		overflow: {
			type: "select" as const,
			label: "Overflow",
			options: [
				{ label: "Visible", value: "visible" },
				{ label: "Auto (scroll)", value: "auto" },
				{ label: "Hidden", value: "hidden" },
			],
		},
		gap: { type: "number" as const, label: "Gap" },
	})

export const buildLayoutStyle = (props: LayoutStyleProps): CSSProperties => {
	return {
		...(props.marginTop !== undefined ? { marginTop: props.marginTop } : {}),
		...(props.marginRight !== undefined ? { marginRight: props.marginRight } : {}),
		...(props.marginBottom !== undefined ? { marginBottom: props.marginBottom } : {}),
		...(props.marginLeft !== undefined ? { marginLeft: props.marginLeft } : {}),
		...(props.paddingTop !== undefined ? { paddingTop: props.paddingTop } : {}),
		...(props.paddingRight !== undefined ? { paddingRight: props.paddingRight } : {}),
		...(props.paddingBottom !== undefined ? { paddingBottom: props.paddingBottom } : {}),
		...(props.paddingLeft !== undefined ? { paddingLeft: props.paddingLeft } : {}),
		...(props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}),
		...(props.borderWidth !== undefined ? { borderWidth: props.borderWidth } : {}),
		...(props.borderRadius !== undefined ? { borderRadius: props.borderRadius } : {}),
		...(props.borderColor ? { borderColor: props.borderColor } : {}),
		...(props.display ? { display: props.display } : {}),
		...(props.flexDirection ? { flexDirection: props.flexDirection } : {}),
		...(props.justifyContent ? { justifyContent: props.justifyContent } : {}),
		...(props.alignItems ? { alignItems: props.alignItems } : {}),
		...(props.flexWrap ? { flexWrap: props.flexWrap } : {}),
		...(overflowStyle(props)),
		...(props.gap !== undefined ? { gap: props.gap } : {}),
	}
}

