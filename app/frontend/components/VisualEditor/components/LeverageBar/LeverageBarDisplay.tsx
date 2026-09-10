import clsx from "clsx"

import { Box } from "@/components"
import { useActiveSlideId } from "@/features/presentation/ActiveSlideProvider"
import { leverageBarIsVisible } from "@/features/presentation/elementControls/LeverageBarVisibilityOverrideControl"
import { usePresentationDataContext } from "@/features/presentation/PresentationDataProvider"
import { useLeverageTotals } from "@/features/presentation/values/leverageTotals"

import { type LeverageBarComponentProps } from "./LeverageBar"
import * as classes from "./LeverageBar.css"
import { LeverageBar as LeverageBarElement } from "../../elements/LeverageBar"
import {
	buildLeverageBarSizeStyle,
	normalizeLeverageBarSize,
	normalizeLeverageColors,
} from "../../fields"

export function LeverageBarDisplay({
	id: elementId,
	colors,
	font,
	currencyFormat,
	size,
	puck,
}: LeverageBarComponentProps) {
	const { dragRef } = puck

	const totals = useLeverageTotals()
	const contextData = usePresentationDataContext(false)
	const slideId = useActiveSlideId()
	const elementControls = contextData?.elementControls

	const isVisible = leverageBarIsVisible(slideId, elementId, elementControls)

	const resolvedColors = normalizeLeverageColors(colors)

	const resolvedSize = normalizeLeverageBarSize(size)

	return (
		<Box
			ref={ dragRef }
			className={ clsx(classes.host, { [classes.hidden]: !isVisible }) }
			style={ buildLeverageBarSizeStyle(resolvedSize) }
			aria-hidden={ isVisible ? undefined : true }
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
