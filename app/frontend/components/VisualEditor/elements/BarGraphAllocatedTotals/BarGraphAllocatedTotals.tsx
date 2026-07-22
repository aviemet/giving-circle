import clsx from "clsx"

import { Box, Text } from "@/components"
import { type Money } from "@/types"

import * as classes from "./BarGraphAllocatedTotals.css"
import { BarPlotColumn } from "./BarPlotColumn"
import { LabelColumn } from "./LabelColumn"

export interface AllocatedTotalEntry {
	orgId: string
	orgName: string
	allocated: Money
	need: Money
}

export interface BarGraphColors {
	barColor: string
	fundedBarColor: string
	textColor: string
	needColor: string
	gridColor: string
}

interface BarGraphAllocatedTotalsProps {
	totals: AllocatedTotalEntry[]
	colors: BarGraphColors
	awardImageSrc?: string
}

export function BarGraphAllocatedTotals({
	totals,
	colors,
	awardImageSrc,
}: BarGraphAllocatedTotalsProps) {
	if(totals.length === 0) {
		return <></>
	}

	return (
		<Box className={ clsx(classes.root) }>
			<Box className={ clsx(classes.chart) }>
				<Box className={ clsx(classes.axis) } style={ { color: colors.textColor } }>
					<Text component="span">100%</Text>
					<Text component="span">50%</Text>
					<Text component="span">0%</Text>
				</Box>
				<Box className={ clsx(classes.plot) } style={ { color: colors.gridColor } }>
					<Box className={ clsx(classes.gridLines) }>
						<Box className={ clsx(classes.gridLine) } />
						<Box className={ clsx(classes.gridLine) } />
						<Box className={ clsx(classes.gridLine) } />
					</Box>
					<Box className={ clsx(classes.barsRow) }>
						{ totals.map((entry) => (
							<BarPlotColumn
								key={ entry.orgId }
								entry={ entry }
								colors={ colors }
								awardImageSrc={ awardImageSrc }
							/>
						)) }
					</Box>
				</Box>
				<Box className={ clsx(classes.labels) }>
					{ totals.map((entry) => (
						<LabelColumn
							key={ entry.orgId }
							entry={ entry }
							colors={ colors }
						/>
					)) }
				</Box>
			</Box>
		</Box>
	)
}
