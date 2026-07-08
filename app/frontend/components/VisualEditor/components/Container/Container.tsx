import { PuckContext, SlotComponent } from "@measured/puck"
import clsx from "clsx"

import { Container } from "@/components"

import { ContainerProps } from "./containerConfig"
import { buildBorderStyle } from "../../fields/border"
import { buildDimensionStyle } from "../../fields/dimension"
import { buildFlexStyle } from "../../fields/flex"
import { buildSpacingStyle } from "../../fields/spacing"
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
			style={ {
				...buildSpacingStyle(styleProps),
				...buildBorderStyle(styleProps),
				...buildDimensionStyle(styleProps),
				...buildFlexStyle(styleProps),
				...(styleProps.backgroundColor ? { backgroundColor: styleProps.backgroundColor } : {}),
			} }
			{ ...slotDropZoneProps() }
		/>
	)
}
