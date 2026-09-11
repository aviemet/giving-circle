import clsx from "clsx"

import { Box } from "@/components"
import { useLeverageTotals } from "@/features/presentation/values/leverageTotals"

import { type LeverageBarComponentProps } from "./LeverageBar"
import * as classes from "./LeverageBar.css"
import { LeverageBar as LeverageBarElement } from "../../elements/LeverageBar"
import {
	buildLeverageBarSizeStyle,
	normalizeLeverageBarSize,
	normalizeLeverageColors,
} from "../../fields"

export function LeverageBarEditor({
	colors,
	font,
	currencyFormat,
	size,
	puck,
}: LeverageBarComponentProps) {
	const totals = useLeverageTotals()
	const resolvedColors = normalizeLeverageColors(colors)
	const resolvedSize = normalizeLeverageBarSize(size)
	const { dragRef } = puck

	return (
		<Box
			ref={ dragRef }
			className={ clsx(classes.host) }
			style={ buildLeverageBarSizeStyle(resolvedSize) }
		>
			<LeverageBarElement
				totals={ totals }
				colors={ resolvedColors }
				font={ font }
				currencyFormat={ currencyFormat }
			/>
		</Box>
	)
}
