import { PuckContext, SlotComponent } from "@measured/puck"
import clsx from "clsx"

import { Container } from "@/components"

import { ContainerProps } from "./containerConfig"
import { buildLayoutStyle } from "../../fields/layout"
import * as classes from "../../Puck.css"
import { slotDropZoneProps } from "../../slotEditor"

export type ContainerComponentProps = Omit<ContainerProps, "content"> & {
	content: SlotComponent
	puck: PuckContext
}

export function ContainerDisplay({
	content: Content,
	alignment,
	puck,
	...styleProps
}: ContainerComponentProps) {
	const { dragRef } = puck

	return (
		<Container
			ref={ dragRef }
			component={ Content }
			className={ clsx("presentation_container", classes.presentationSlot) }
			ta={ alignment }
			fluid
			w="100%"
			style={ buildLayoutStyle(styleProps) }
			{ ...slotDropZoneProps() }
		/>
	)
}
