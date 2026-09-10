import { PuckComponent } from "@puckeditor/core"

import { TextDisplay } from "./TextDisplay"
import { TextEditor } from "./TextEditor"
import {
	type AlignmentValue,
	type TextFlowValue,
	type TextFontValue,
	type TextLayoutValue,
	type TypeStyleValue,
} from "../../fields"

export type TextProps = {
	content: string
	font?: TextFontValue
	typeStyle?: TypeStyleValue
	alignment: AlignmentValue
	flow?: TextFlowValue
	layout?: TextLayoutValue
}

export type TextComponentProps = Parameters<PuckComponent<TextProps>>[0]

export function Text(props: TextComponentProps) {
	return props.puck.isEditing
		? <TextEditor { ...props } />
		: <TextDisplay { ...props } />
}
