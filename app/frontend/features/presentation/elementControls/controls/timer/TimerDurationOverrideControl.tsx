import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Stack, Text } from "@/components"
import { NumberInput } from "@/components/Inputs"
import {
	normalizeTimerDuration,
	timerDurationToSeconds,
	type TimerDurationValue,
} from "@/components/VisualEditor/fields/timerDuration/timerDuration"
import { useUpdateElementControl } from "@/queries/presentations/elementControls"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import { type ElementControlPanelProps } from "../../registry"
import { readElementControlValue } from "../../types"

function durationFromControlValue(value: Record<string, string | number | boolean | null> | undefined): TimerDurationValue | undefined {
	if(value === undefined) {
		return undefined
	}

	const minutesRaw = value.minutes
	const secondsRaw = value.seconds
	const minutes = typeof minutesRaw === "number" ? minutesRaw : Number(minutesRaw)
	const seconds = typeof secondsRaw === "number" ? secondsRaw : Number(secondsRaw)

	if(Number.isNaN(minutes) || Number.isNaN(seconds)) {
		return undefined
	}

	return normalizeTimerDuration({ minutes, seconds })
}

interface TimerDurationOverrideControlProps extends ElementControlPanelProps {}

export function TimerDurationOverrideControl({
	slideId,
	elementId,
	elementControls,
	circleSlug,
	presentationSlug,
	disabled,
	onElementControlsUpdated,
}: TimerDurationOverrideControlProps) {
	const { t } = useTranslation()
	const storedValue = readElementControlValue(
		elementControls,
		slideId,
		elementId,
		"Timer",
		"duration",
	)
	const storedDuration = durationFromControlValue(storedValue)
	const defaultDuration = normalizeTimerDuration(undefined)
	const resolvedDuration = storedDuration ?? defaultDuration
	const [pendingDuration, setPendingDuration] = useState<TimerDurationValue | null>(null)
	const displayValue = pendingDuration ?? resolvedDuration

	const { mutate, isPending } = useUpdateElementControl({
		params: {
			circleSlug,
			presentationSlug,
		},
		onSuccess: (data) => {
			setPendingDuration(null)
			onElementControlsUpdated?.(data.element_controls)
		},
		onError: () => {
			setPendingDuration(null)
		},
	})

	const updateValue = (patch: Partial<TimerDurationValue>) => {
		const next = normalizeTimerDuration({
			...displayValue,
			...patch,
		})
		setPendingDuration(next)
		mutate({
			slideId,
			elementId,
			elementType: "Timer",
			control: "duration",
			value: next,
		})
	}

	return (
		<Stack gap="xs">
			<Text size="sm" fw={ 500 }>
				{ t("presentations.active.controls.element_controls.timer.duration_override") }
			</Text>
			<NumberInput
				label={ t("presentations.active.controls.element_controls.timer.minutes") }
				value={ displayValue.minutes }
				min={ 0 }
				step={ 1 }
				disabled={ disabled === true || isPending }
				onChange={ (nextValue) => {
					const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
					updateValue({ minutes: Number.isNaN(numericValue) ? 0 : numericValue })
				} }
			/>
			<NumberInput
				label={ t("presentations.active.controls.element_controls.timer.seconds") }
				value={ displayValue.seconds }
				min={ 0 }
				max={ 59 }
				step={ 1 }
				disabled={ disabled === true || isPending }
				onChange={ (nextValue) => {
					const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
					updateValue({ seconds: Number.isNaN(numericValue) ? 0 : numericValue })
				} }
			/>
		</Stack>
	)
}

export function useTimerDurationOverrideSeconds(
	slideId: string | undefined,
	elementId: string | undefined,
	elementControls: ElementControlsPayload | undefined,
	designedDurationSeconds: number,
): number {
	return useMemo(() => {
		if(slideId === undefined || elementId === undefined) {
			return designedDurationSeconds
		}

		const storedValue = readElementControlValue(
			elementControls,
			slideId,
			elementId,
			"Timer",
			"duration",
		)
		const overrideDuration = durationFromControlValue(storedValue)

		if(overrideDuration === undefined) {
			return designedDurationSeconds
		}

		return timerDurationToSeconds(overrideDuration)
	}, [slideId, elementId, elementControls, designedDurationSeconds])
}
