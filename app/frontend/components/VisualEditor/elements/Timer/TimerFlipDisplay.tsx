import { useEffect, useRef } from "react"
import { FlipCardPanel, type FlipCardRef } from "react-flip-cards"
import "react-flip-cards/styles.css"

import { Box } from "@/components"

import * as classes from "./Timer.css"
import { flipClockDigits } from "./timerFormat"

interface TimerFlipDisplayProps {
	remainingSeconds: number
	digitColor: string
	fontSize?: string
}

export function TimerFlipDisplay({
	remainingSeconds,
	digitColor,
	fontSize,
}: TimerFlipDisplayProps) {
	const panelRef = useRef<FlipCardRef>(null)
	const { digits, separators } = flipClockDigits(remainingSeconds)
	const cardCount = digits.length
	const resolvedFontSize = fontSize ?? "3.5rem"

	useEffect(() => {
		panelRef.current?.set(flipClockDigits(remainingSeconds).digits)
	}, [remainingSeconds])

	return (
		<Box className={ classes.flipWrap }>
			<FlipCardPanel
				key={ cardCount }
				ref={ panelRef }
				nrCards={ cardCount }
				initialValue={ digits }
				separators={ separators }
				showLabels={ false }
				showDivider={ true }
				duration={ 0.45 }
				mode="sync"
				spacing="0.35em"
				blockStyle={ {
					color: digitColor,
					background: "#111111",
					fontSize: resolvedFontSize,
					width: `calc(${resolvedFontSize} * 0.72)`,
					height: `calc(${resolvedFontSize} * 1.05)`,
					borderRadius: "0.12em",
				} }
				separatorStyle={ {
					color: digitColor,
					size: `calc(${resolvedFontSize} * 0.18)`,
				} }
				dividerStyle={ {
					color: "rgba(255, 255, 255, 0.18)",
					height: 1,
				} }
			/>
		</Box>
	)
}
