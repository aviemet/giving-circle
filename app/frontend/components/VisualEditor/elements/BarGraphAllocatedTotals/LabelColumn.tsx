import clsx from "clsx"

import { Box, Text } from "@/components"
import { isFullyFunded, remainingNeed } from "@/features/presentation"
import { currency } from "@/lib/formatters"

import { type AllocatedTotalEntry, type BarGraphColors } from "./BarGraphAllocatedTotals"
import * as classes from "./BarGraphAllocatedTotals.css"

interface LabelColumnProps {
	entry: AllocatedTotalEntry
	colors: BarGraphColors
}

export function LabelColumn({
	entry,
	colors,
}: LabelColumnProps) {
	const fullyFunded = isFullyFunded(entry)

	return (
		<Box className={ clsx(classes.labelColumn) }>
			<Text className={ clsx(classes.orgName) } style={ { color: colors.textColor } }>
				{ entry.orgName }
			</Text>
			<Text className={ clsx(classes.needLine) } style={ { color: colors.needColor } }>
				Need: { fullyFunded
					? "--"
					: currency.compact(remainingNeed(entry))
				}
			</Text>
		</Box>
	)
}
