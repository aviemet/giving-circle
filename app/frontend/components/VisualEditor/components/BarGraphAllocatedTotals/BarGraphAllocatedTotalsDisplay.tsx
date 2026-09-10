import { clsx } from "clsx"

import { Box } from "@/components"

import { type BarGraphAllocatedTotalsComponentProps } from "./BarGraphAllocatedTotals"
import { BarGraphAllocatedTotals, useAllocatedTotals } from "../../elements/BarGraphAllocatedTotals"
import * as elementClasses from "../../elements/BarGraphAllocatedTotals/BarGraphAllocatedTotals.css"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"

export function BarGraphAllocatedTotalsDisplay({
	barColor,
	fundedBarColor,
	textColor,
	needColor,
	gridColor,
	awardImageSrc,
	sizing,
}: BarGraphAllocatedTotalsComponentProps) {
	const totals = useAllocatedTotals()

	return (
		<Box
			className={ clsx(elementClasses.host) }
			style={ buildFlexItemSizingStyle(sizing ?? { mode: "fill" }) }
		>
			<BarGraphAllocatedTotals
				totals={ totals }
				colors={ {
					barColor,
					fundedBarColor,
					textColor,
					needColor,
					gridColor,
				} }
				awardImageSrc={ awardImageSrc || undefined }
			/>
		</Box>
	)
}
