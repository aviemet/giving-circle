import { PuckContext, SlotComponent } from "@puckeditor/core"
import clsx from "clsx"

import { Container } from "@/components"
import { usePresentationDataContext } from "@/features/presentation"

import { buildContainerStyle } from "./buildContainerStyle"
import * as classes from "./Container.css"
import * as editorClasses from "./Container.editor.css"
import { ContainerProps } from "./containerConfig"
import {
	getIterateItems,
	isIterateOn,
	IterateHint,
	ORG_ITERATE_PATH_PREFIX,
	RepeatedSlot,
} from "../../fields/iterate"
import * as iterateEditorClasses from "../../fields/iterate/iterate.editor.css"
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
	iterate,
	...styleProps
}: ContainerComponentProps) {
	const { dragRef, isEditing } = puck
	const contextData = usePresentationDataContext()
	const iterating = isIterateOn(iterate)
	const items = getIterateItems(contextData, iterate)
	const className = containerClassName(isEditing)
	const style = buildContainerStyle(styleProps, sizing, isEditing)

	if(isEditing && iterating) {
		return (
			<Container
				ref={ dragRef }
				className={ className }
				ta={ alignment }
				fluid
				w="100%"
				style={ style }
			>
				<Content
					className={ clsx(puckClasses.presentationSlot, iterateEditorClasses.iterateSlot) }
					{ ...slotDropZoneProps() }
				/>
				<IterateHint />
			</Container>
		)
	}

	if(!isEditing && iterating) {
		return (
			<Container
				ref={ dragRef }
				className={ className }
				ta={ alignment }
				fluid
				w="100%"
				style={ style }
			>
				<RepeatedSlot
					content={ Content }
					items={ items }
					pathPrefix={ ORG_ITERATE_PATH_PREFIX }
				/>
			</Container>
		)
	}

	return (
		<Container
			ref={ dragRef }
			component={ Content }
			className={ className }
			ta={ alignment }
			fluid
			w="100%"
			style={ style }
			{ ...slotDropZoneProps() }
		/>
	)
}
