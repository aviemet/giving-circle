import { PuckComponent } from "@puckeditor/core"

import { BarGraphAllocatedTotalsDisplay } from "./BarGraphAllocatedTotalsDisplay"
import { BarGraphAllocatedTotalsEditor } from "./BarGraphAllocatedTotalsEditor"
import { type FlexItemSizing } from "../../fields"

export type BarGraphAllocatedTotalsProps = {
	barColor: string
	fundedBarColor: string
	textColor: string
	needColor: string
	gridColor: string
	awardImageSrc: string
	sizing?: FlexItemSizing
}

export type BarGraphAllocatedTotalsComponentProps = Parameters<PuckComponent<BarGraphAllocatedTotalsProps>>[0]

export function BarGraphAllocatedTotals(props: BarGraphAllocatedTotalsComponentProps) {
	return props.puck.isEditing
		? <BarGraphAllocatedTotalsEditor { ...props } />
		: <BarGraphAllocatedTotalsDisplay { ...props } />
}
