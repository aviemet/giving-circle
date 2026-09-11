import { PuckComponent } from "@puckeditor/core"

import { HeadingDisplay } from "./HeadingDisplay"
import { HeadingEditor } from "./HeadingEditor"
import {
	type AlignmentValue,
	type HeadingMetricsValue,
	type TextFlowValue,
	type TextFontValue,
	type TypeStyleValue,
} from "../../fields"

export type HeadingProps = {
	title: string
	metrics?: HeadingMetricsValue
	font?: TextFontValue
	typeStyle?: TypeStyleValue
	alignment: AlignmentValue
	flow?: TextFlowValue
}

export type HeadingComponentProps = Parameters<PuckComponent<HeadingProps>>[0]

export function Heading(props: HeadingComponentProps) {
	return props.puck.isEditing
		? <HeadingEditor { ...props } />
		: <HeadingDisplay { ...props } />
}
