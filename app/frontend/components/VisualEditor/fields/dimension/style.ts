import { type CSSProperties } from "react"

import { normalizeDimensionValue } from "./dimension"

export type DimensionStyleProps = {
	width?: string
	minWidth?: string
	minHeight?: string
}

export function buildDimensionStyle(props: DimensionStyleProps): CSSProperties {
	return {
		...(props.width ? { width: normalizeDimensionValue(props.width) } : {}),
		...(props.minWidth ? { minWidth: normalizeDimensionValue(props.minWidth) } : {}),
		...(props.minHeight ? { minHeight: normalizeDimensionValue(props.minHeight) } : {}),
	}
}
