import { PuckContext, SlotComponent } from "@measured/puck"
import clsx from "clsx"

import { Container } from "@/components"

import { buildContainerStyle } from "./buildContainerStyle"
import * as classes from "./Container.css"
import * as editorClasses from "./Container.editor.css"
import { ContainerProps } from "./containerConfig"
import * as layoutChrome from "../../layoutChrome.editor.css"
import * as puckClasses from "../../Puck.css"
import { slotDropZoneProps } from "../../slotEditor"

export type ContainerComponentProps = Omit<ContainerProps, "content"> & {
	content: SlotComponent
	puck: PuckContext
}

export function containerClassName(isEditing: boolean) {
	return clsx(
		classes.container,
		isEditing && editorClasses.container,
		isEditing && layoutChrome.frame,
		isEditing && layoutChrome.labelContainer,
		isEditing && puckClasses.presentationSlot,
	)
}

export function ContainerDisplay({
	content: Content,
	alignment,
	sizing,
	puck,
	...styleProps
}: ContainerComponentProps) {
	const { dragRef, isEditing } = puck

	return (
		<Container
			ref={ dragRef }
			component={ Content }
			className={ containerClassName(isEditing) }
			ta={ alignment }
			fluid
			w="100%"
			style={ buildContainerStyle(styleProps, sizing, isEditing) }
			{ ...slotDropZoneProps() }
		/>
	)
}
