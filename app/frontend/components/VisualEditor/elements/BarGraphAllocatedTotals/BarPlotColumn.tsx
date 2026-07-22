import clsx from "clsx"

import { Box, Image, Text } from "@/components"
import { fundedPercent, isFullyFunded } from "@/features/presentation"
import { currency } from "@/lib/formatters"

import { type AllocatedTotalEntry, type BarGraphColors } from "./BarGraphAllocatedTotals"
import * as classes from "./BarGraphAllocatedTotals.css"

interface BarPlotColumnProps {
	entry: AllocatedTotalEntry
	colors: BarGraphColors
	awardImageSrc?: string
}

export function BarPlotColumn({
	entry,
	colors,
	awardImageSrc,
}: BarPlotColumnProps) {
	const percent = fundedPercent(entry)

	const fullyFunded = isFullyFunded(entry)
	const barHeight = percent > 0 ? Math.max(percent, 3) : 0

	return (
		<Box className={ clsx(classes.barColumn) }>
			<Box className={ clsx(classes.barStack) }>
				{ fullyFunded && Boolean(awardImageSrc) && (
					<Image
						className={ clsx(classes.award) }
						src={ awardImageSrc }
						alt=""
					/>
				) }
				<Box
					className={ clsx(classes.bar) }
					style={ {
						height: `${barHeight}%`,
						backgroundColor: fullyFunded ? colors.fundedBarColor : colors.barColor,
					} }
				>
					{ percent > 8 && (
						<Text className={ clsx(classes.barValue) } style={ { color: colors.textColor } }>
							{ currency.whole(entry.allocated) }
						</Text>
					) }
				</Box>
			</Box>
		</Box>
	)
}
