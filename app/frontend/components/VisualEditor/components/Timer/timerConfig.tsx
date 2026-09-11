import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Timer, type TimerProps } from "./Timer"
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
	timerExhaustedField,
} from "../../fields"

export const timerConfig: ComponentConfig<TimerProps> = {
	label: i18n.t("slides.editor.components.timer.label"),
	fields: {
		displayType: timerDisplayField(),
		exhausted: timerExhaustedField(),
		sizing: flexItemSizingField(),
		duration: timerDurationField(),
		colors: timerColorsField(),
		font: textFontField({
			allowInherit: false,
			allowAutoSize: false,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "4xl",
		}),
	},
	defaultProps: {
		displayType: "circle",
		exhausted: defaultTimerExhausted(),
		sizing: { mode: "fill" },
		duration: defaultTimerDuration(),
		colors: defaultTimerColors(),
		font: defaultTextFontValue({
			color: "#FFFFFF",
			sizePreset: "4xl",
		}),
	},
	resolveData: ({ props }) => {
		if(props === undefined) {
			return {}
		}

		return {
			props: {
				...props,
				duration: normalizeTimerDuration(props.duration),
				colors: normalizeTimerColors(props.colors),
				exhausted: normalizeTimerExhausted(props.exhausted),
			},
		}
	},
	render: (props) => <Timer { ...props } />,
}
