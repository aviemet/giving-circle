import { type CSSProperties } from "react"

export type FlexProps = {
	display?: "block" | "flex"
	flexDirection?: "row" | "column"
	flexWrap?: "nowrap" | "wrap"
	overflow?: "visible" | "auto" | "hidden"
	justifyContent?: "flex-start" | "center" | "space-between" | "space-around" | "flex-end"
	alignItems?: "flex-start" | "center" | "stretch" | "flex-end"
	gap?: number
}

export type FlexStyleInput = Partial<FlexProps> & {
	flex?: Partial<FlexProps>
}

function flexFromProps(props: FlexStyleInput): Partial<FlexProps> {
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

export function buildFlexStyle(props: FlexStyleInput): CSSProperties {
	const flex = flexFromProps(props)

	return {
		...(flex.display ? { display: flex.display } : {}),
		...(flex.flexDirection ? { flexDirection: flex.flexDirection } : {}),
		...(flex.justifyContent ? { justifyContent: flex.justifyContent } : {}),
		...(flex.alignItems ? { alignItems: flex.alignItems } : {}),
		...(flex.flexWrap ? { flexWrap: flex.flexWrap } : {}),
		...overflowStyle(flex),
		...(flex.gap !== undefined ? { gap: flex.gap } : {}),
	}
}
