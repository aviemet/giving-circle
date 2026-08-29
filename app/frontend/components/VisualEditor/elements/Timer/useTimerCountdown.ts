import { useEffect, useState } from "react"

import { usePresentationDataContext } from "@/features/presentation"
import { useActiveSlideId } from "@/features/presentation/ActiveSlideProvider"
import { useTimerDurationOverrideSeconds } from "@/features/presentation/elementControls"

export function useLocalCountdown(durationSeconds: number, isRunning: boolean) {
	const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds)
	const [trackedDurationSeconds, setTrackedDurationSeconds] = useState(durationSeconds)

	if(durationSeconds !== trackedDurationSeconds) {
		setTrackedDurationSeconds(durationSeconds)
		setRemainingSeconds(durationSeconds)
	}

	useEffect(() => {
		if(!isRunning) {
			return
		}

		const intervalId = window.setInterval(() => {
			setRemainingSeconds((current) => {
				if(current <= 0) {
					return 0
				}

				return current - 1
			})
		}, 1000)

		return () => {
			window.clearInterval(intervalId)
		}
	}, [isRunning, durationSeconds])

	return remainingSeconds
}

interface UseTimerCountdownOptions {
	elementId?: string
	designedDurationSeconds: number
}

export function useTimerCountdown({
	elementId,
	designedDurationSeconds,
}: UseTimerCountdownOptions) {
	const contextData = usePresentationDataContext(false)
	const isEditor = contextData?.isEditor === true
	const isRunning = !isEditor
	const slideId = useActiveSlideId()
	const elementControls = contextData?.elementControls

	const effectiveDurationSeconds = useTimerDurationOverrideSeconds(
		slideId,
		elementId,
		elementControls,
		designedDurationSeconds,
	)

	return useLocalCountdown(effectiveDurationSeconds, isRunning)
}

export function useTimerEffectiveDurationSeconds({
	elementId,
	designedDurationSeconds,
}: UseTimerCountdownOptions) {
	const contextData = usePresentationDataContext(false)
	const slideId = useActiveSlideId()
	const elementControls = contextData?.elementControls

	return useTimerDurationOverrideSeconds(
		slideId,
		elementId,
		elementControls,
		designedDurationSeconds,
	)
}
