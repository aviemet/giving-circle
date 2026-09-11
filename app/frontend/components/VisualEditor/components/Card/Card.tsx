import { PuckComponent } from "@puckeditor/core"

import { CardDisplay } from "./CardDisplay"
import { CardEditor } from "./CardEditor"
import {
	type BorderProps,
	type BoxModelValue,
	type FlexItemSizing,
	type FlexStyleInput,
} from "../../fields"

export type CardProps = FlexStyleInput & {
	title: string
	description: string
	backgroundColor: string
	fontColor: string
	sizing?: FlexItemSizing
	spacing?: BoxModelValue
	border?: BorderProps
}

export type CardComponentProps = Parameters<PuckComponent<CardProps>>[0]

export function Card(props: CardComponentProps) {
	return props.puck.isEditing
		? <CardEditor { ...props } />
		: <CardDisplay { ...props } />
}
