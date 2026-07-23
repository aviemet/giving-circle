import { Digit, type DigitProps } from "react-led-digit"

import { Box } from "@/components"

import * as classes from "./Timer.css"
import { formatTimerSeconds } from "./timerFormat"

interface TimerSevenSegmentDisplayProps {
	remainingSeconds: number
	digitColor: string
	fontSize?: string
}

function isSevenSegmentDigitChar(char: string): char is "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" {
	switch(char) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true
		default:
			return false
	}
}

function digitValueForChar(char: string): DigitProps["value"] | undefined {
	if(char === ":") {
		return ":"
	}

	if(isSevenSegmentDigitChar(char)) {
		return char
	}

	return undefined
}

export function TimerSevenSegmentDisplay({
	remainingSeconds,
	digitColor,
	fontSize,
}: TimerSevenSegmentDisplayProps) {
	const resolvedFontSize = fontSize ?? "4rem"
	const characters = formatTimerSeconds(remainingSeconds).split("")

	return (
		<Box
			className={ classes.sevenSegmentWrap }
			style={ {
				fontSize: resolvedFontSize,
				color: digitColor,
			} }
		>
			{ characters.map((character, index) => {
				const value = digitValueForChar(character)
				if(value === undefined) {
					return null
				}

				return (
					<Digit
						key={ `${index}-${character}` }
						value={ value }
						shape="calculator"
						segmentStyle={ {
							color: digitColor,
							colorOff: "rgba(255, 255, 255, 0.08)",
							length: "0.55em",
							thickness: "0.12em",
							opacityOn: 1,
							opacityOff: 0.12,
							transitionDuration: "0s",
						} }
					/>
				)
			}) }
		</Box>
	)
}
