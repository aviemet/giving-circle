import clsx from "clsx"

import { Container } from "@/components"

import { buildContainerEditorStyle } from "./buildContainerStyle"
import { type ContainerComponentProps } from "./Container"
import * as classes from "./Container.css"
import * as editorClasses from "./Container.editor.css"
import { isIterateOn, IterateHint } from "../../fields/iterate"
import * as iterateEditorClasses from "../../fields/iterate/iterate.editor.css"
import { slotDropZoneProps } from "../../lib/slotEditor"
import * as layoutChrome from "../../styles/layoutChrome.editor.css"
import * as puckClasses from "../../styles/Puck.css"

export function ContainerEditor({
	content: Content,
	alignment,
	sizing,
	puck,
	iterate,
	...styleProps
}: ContainerComponentProps) {
	const { dragRef } = puck
	const iterating = isIterateOn(iterate)

	const containerProps = {
		ref: dragRef,
		style: buildContainerEditorStyle(styleProps, sizing),
		ta: alignment,
		fluid: true,
		w: "100%",
		className: clsx(
			classes.container,
			editorClasses.container,
			layoutChrome.frame,
			layoutChrome.labelContainer,
			puckClasses.presentationSlot,
		),
	}

	if(iterating) {
		return (
			<Container { ...containerProps }>
				<Content
					className={ clsx(puckClasses.presentationSlot, iterateEditorClasses.iterateSlot) }
					{ ...slotDropZoneProps() }
				/>
				<IterateHint iterate={ iterate } />
			</Container>
		)
	}

	return (
		<Container
			component={ Content }
			{ ...containerProps }
			{ ...slotDropZoneProps() }
		/>
	)
}
