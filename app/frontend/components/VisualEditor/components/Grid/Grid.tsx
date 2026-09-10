import { type PuckComponent, type Slot } from "@puckeditor/core"

import { GridDisplay } from "./GridDisplay"
import { GridEditor } from "./GridEditor"
import {
	type BackgroundValue,
	type BorderProps,
	type BoxModelValue,
	type FlexItemSizing,
	type GridLayoutValue,
	type IterateValue,
} from "../../fields"

export type GridProps = {
	background?: BackgroundValue
	border?: BorderProps
	content: Slot
	grid?: GridLayoutValue
	sizing?: FlexItemSizing
	spacing?: BoxModelValue
	iterate?: IterateValue
}

export type GridComponentProps = Parameters<PuckComponent<GridProps>>[0]

export function Grid(props: GridComponentProps) {
	return props.puck.isEditing
		? <GridEditor { ...props } />
		: <GridDisplay { ...props } />
}
