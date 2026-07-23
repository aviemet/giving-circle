import { useEffect, useState } from "react"

import { usePresentationDataContext } from "@/features/presentation"

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

export function useTimerCountdown(durationSeconds: number) {
	const contextData = usePresentationDataContext(false)
	const isEditor = contextData?.isEditor === true
	const isRunning = !isEditor

	return useLocalCountdown(durationSeconds, isRunning)
}
