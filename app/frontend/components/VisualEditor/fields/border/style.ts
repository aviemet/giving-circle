import { type CSSProperties } from "react"

export type BorderProps = {
	borderWidth?: number
	borderRadius?: number
	borderColor?: string
}

export function buildBorderStyle(props: BorderProps): CSSProperties {
	const style: CSSProperties = {
		...(props.borderWidth !== undefined ? { borderWidth: props.borderWidth } : {}),
		...(props.borderRadius !== undefined ? { borderRadius: props.borderRadius } : {}),
		...(props.borderColor ? { borderColor: props.borderColor } : {}),
	}

	if(props.borderWidth !== undefined && props.borderWidth > 0) {
		style.borderStyle = "solid"
	}

	return style
}
