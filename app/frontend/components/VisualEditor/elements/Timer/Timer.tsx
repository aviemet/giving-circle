import clsx from "clsx"
import { type CSSProperties } from "react"

import { Box, Text } from "@/components"

import * as classes from "./Timer.css"
import { TimerFlipDisplay } from "./TimerFlipDisplay"
import {
	formatTimerSeconds,
	remainingFraction,
	type TimerDisplayType,
	type TimerExhaustedMode,
} from "./timerFormat"
import { TimerSevenSegmentDisplay } from "./TimerSevenSegmentDisplay"
import {
	componentFontFamilyCss,
	normalizeTextFontValue,
	resolveFontSize,
	type TextFontValue,
	type TimerColorsValue,
} from "../../fields"
import { SlideFontFace } from "../../SlideFontFace"

export interface TimerProps {
	remainingSeconds: number
	durationSeconds: number
	displayType: TimerDisplayType
	colors: TimerColorsValue
	font?: TextFontValue
	exhaustedMode: TimerExhaustedMode
	exhaustedMessage: string
}

const CIRCLE_RADIUS = 45
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

export function Timer({
	remainingSeconds,
	durationSeconds,
	displayType,
	colors,
	font,
	exhaustedMode,
	exhaustedMessage,
}: TimerProps) {
	const resolvedFont = normalizeTextFontValue(font, undefined, {
		color: "#FFFFFF",
		sizePreset: "4xl",
	})
	const resolvedSize = resolveFontSize(resolvedFont.size)
	const isExhausted = remainingSeconds <= 0
	const showExhaustedMessage = isExhausted && exhaustedMode === "message"
	const label = showExhaustedMessage
		? exhaustedMessage
		: formatTimerSeconds(remainingSeconds)
	const textColor = resolvedFont.color.length > 0 ? resolvedFont.color : "#FFFFFF"

	const labelStyle: CSSProperties = {
		color: textColor,
		fontFamily: componentFontFamilyCss(resolvedFont),
	}

	if(resolvedSize.fontSize !== undefined) {
		labelStyle.fontSize = resolvedSize.fontSize
	}

	if(showExhaustedMessage) {
		return (
			<>
				<SlideFontFace font={ resolvedFont } />
				<Text
					className={ clsx(classes.digital) }
					style={ labelStyle }
					size={ resolvedSize.mantineSize }
					ff={ componentFontFamilyCss(resolvedFont) }
					c={ textColor }
					fw={ 700 }
				>
					{ label }
				</Text>
			</>
		)
	}

	if(displayType === "flip") {
		return (
			<TimerFlipDisplay
				remainingSeconds={ remainingSeconds }
				digitColor={ textColor }
				fontSize={ resolvedSize.fontSize }
			/>
		)
	}

	if(displayType === "sevenSegment") {
		return (
			<TimerSevenSegmentDisplay
				remainingSeconds={ remainingSeconds }
				digitColor={ textColor }
				fontSize={ resolvedSize.fontSize }
			/>
		)
	}

	if(displayType === "digital") {
		return (
			<>
				<SlideFontFace font={ resolvedFont } />
				<Text
					className={ clsx(classes.digital) }
					style={ labelStyle }
					size={ resolvedSize.mantineSize }
					ff={ componentFontFamilyCss(resolvedFont) }
					c={ textColor }
					fw={ 700 }
				>
					{ label }
				</Text>
			</>
		)
	}

	const progress = remainingFraction(remainingSeconds, durationSeconds)
	const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progress)

	return (
		<>
			<SlideFontFace font={ resolvedFont } />
			<Box className={ clsx(classes.circleWrap) }>
				<svg className={ clsx(classes.circleSvg) } viewBox="0 0 100 100" aria-hidden="true">
					<circle
						cx="50"
						cy="50"
						r={ CIRCLE_RADIUS }
						fill="none"
						stroke={ colors.ringTrackColor }
						strokeWidth="2"
					/>
					<circle
						cx="50"
						cy="50"
						r={ CIRCLE_RADIUS }
						fill="none"
						stroke={ colors.ringProgressColor }
						strokeWidth="2"
						strokeLinecap="butt"
						strokeDasharray={ CIRCLE_CIRCUMFERENCE }
						strokeDashoffset={ dashOffset }
					/>
				</svg>
				<Text
					className={ clsx(classes.circleLabel) }
					style={ labelStyle }
					size={ resolvedSize.mantineSize }
					ff={ componentFontFamilyCss(resolvedFont) }
					c={ textColor }
					fw={ 700 }
				>
					{ label }
				</Text>
			</Box>
		</>
	)
}
