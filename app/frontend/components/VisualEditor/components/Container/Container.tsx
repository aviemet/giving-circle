import { PuckComponent, Slot } from "@puckeditor/core"

import { ContainerDisplay } from "./ContainerDisplay"
import { ContainerEditor } from "./ContainerEditor"
import {
	type AlignmentValue,
	type BackgroundValue,
	type BorderProps,
	type BoxModelValue,
	type FlexItemSizing,
	type FlexStyleInput,
	type IterateValue,
} from "../../fields"

export type ContainerProps = FlexStyleInput & {
	background?: BackgroundValue
	border?: BorderProps
	content: Slot
	alignment: AlignmentValue
	sizing?: FlexItemSizing
	spacing?: BoxModelValue
	iterate?: IterateValue
}

export type ContainerComponentProps = Parameters<PuckComponent<ContainerProps>>[0]

export function Container(props: ContainerComponentProps) {
	return props.puck.isEditing
		? <ContainerEditor { ...props } />
		: <ContainerDisplay { ...props } />
}
