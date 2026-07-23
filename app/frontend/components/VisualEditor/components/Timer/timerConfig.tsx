import { type ComponentConfig } from "@puckeditor/core"
import clsx from "clsx"

import { Box } from "@/components"
import { i18n } from "@/lib/i18n"

import * as classes from "./Timer.css"
import {
	Timer,
	useTimerCountdown,
	type TimerDisplayType,
} from "../../elements/Timer"
import * as elementClasses from "../../elements/Timer/Timer.css"
import {
	defaultTextFontValue,
	defaultTimerColors,
	defaultTimerDuration,
	defaultTimerExhausted,
	flexItemSizingField,
	normalizeTimerColors,
	normalizeTimerDuration,
	normalizeTimerExhausted,
	textFontField,
	timerColorsField,
	timerDisplayField,
	timerDurationField,
	timerDurationToSeconds,
	timerExhaustedField,
	type FlexItemSizing,
	type TextFontValue,
	type TimerColorsValue,
	type TimerDurationValue,
	type TimerExhaustedValue,
} from "../../fields"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"

export type TimerProps = {
	displayType: TimerDisplayType
	duration?: TimerDurationValue
	durationMinutes?: number
	durationSeconds?: number
	colors?: TimerColorsValue
	ringTrackColor?: string
	ringProgressColor?: string
	textColor?: string
	font?: TextFontValue
	exhausted?: TimerExhaustedValue
	exhaustedMode?: "zero" | "message"
	exhaustedMessage?: string
	sizing?: FlexItemSizing
}

function TimerDisplay({
	displayType,
	duration,
	durationMinutes,
	durationSeconds,
	colors,
	ringTrackColor,
	ringProgressColor,
	textColor,
	font,
	exhausted,
	exhaustedMode,
	exhaustedMessage,
	sizing,
}: TimerProps) {
	const resolvedDuration = normalizeTimerDuration(duration, {
		durationMinutes,
		durationSeconds,
	})
	const resolvedColors = normalizeTimerColors(colors, {
		ringTrackColor,
		ringProgressColor,
		textColor,
	})
	const resolvedExhausted = normalizeTimerExhausted(exhausted, {
		exhaustedMode,
		exhaustedMessage,
	})
	const resolvedFont = font ?? defaultTextFontValue({
		color: textColor ?? "#FFFFFF",
		sizePreset: "4xl",
	})
	const durationTotalSeconds = timerDurationToSeconds(resolvedDuration)
	const remainingSeconds = useTimerCountdown(durationTotalSeconds)

	return (
		<Box
			className={ clsx(classes.host, elementClasses.host) }
			style={ buildFlexItemSizingStyle(sizing ?? { mode: "fill" }) }
		>
			<Timer
				remainingSeconds={ remainingSeconds }
				durationSeconds={ durationTotalSeconds }
				displayType={ displayType }
				colors={ resolvedColors }
				font={ resolvedFont }
				exhaustedMode={ resolvedExhausted.mode }
				exhaustedMessage={ resolvedExhausted.message }
			/>
		</Box>
	)
}

const t = i18n.t.bind(i18n)

export const timerConfig: ComponentConfig<TimerProps> = {
	label: t("slides.editor.components.timer.label"),
	fields: {
		sizing: flexItemSizingField(),
		displayType: timerDisplayField(),
		duration: timerDurationField(),
		colors: timerColorsField(),
		font: textFontField({
			allowInherit: false,
			allowAutoSize: false,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "4xl",
		}),
		exhausted: timerExhaustedField(),
	},
	defaultProps: {
		sizing: { mode: "fill" },
		displayType: "circle",
		duration: defaultTimerDuration(),
		colors: defaultTimerColors(),
		font: defaultTextFontValue({
			color: "#FFFFFF",
			sizePreset: "4xl",
		}),
		exhausted: defaultTimerExhausted(),
	},
	resolveData: ({ props }) => {
		if(props === undefined) {
			return {}
		}

		return {
			props: {
				...props,
				duration: normalizeTimerDuration(props.duration, {
					durationMinutes: props.durationMinutes,
					durationSeconds: props.durationSeconds,
				}),
				colors: normalizeTimerColors(props.colors, {
					ringTrackColor: props.ringTrackColor,
					ringProgressColor: props.ringProgressColor,
					textColor: props.textColor,
				}),
				exhausted: normalizeTimerExhausted(props.exhausted, {
					exhaustedMode: props.exhaustedMode,
					exhaustedMessage: props.exhaustedMessage,
				}),
			},
		}
	},
	render: (props) => <TimerDisplay { ...props } />,
}
