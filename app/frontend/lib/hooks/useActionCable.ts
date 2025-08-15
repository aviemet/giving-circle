import { useEffect, useRef } from "react"

import { createChannel } from "../actioncable"

interface UseActionCableOptions<T = unknown> {
	channelName: string
	params?: Record<string, unknown>
	onReceived?: (data: T) => void
	onConnected?: () => void
	onDisconnected?: () => void
}

export const useActionCable = <T = unknown>({ channelName, params, onReceived, onConnected, onDisconnected }: UseActionCableOptions<T>) => {
	const subscriptionRef = useRef<ReturnType<typeof createChannel> | null>(null)

	useEffect(() => {
		subscriptionRef.current = createChannel(channelName, {
			received: onReceived,
			connected: onConnected,
			disconnected: onDisconnected,
		}, params)

		return () => {
			if(subscriptionRef.current) {
				subscriptionRef.current.unsubscribe()
			}
		}
	}, [channelName, params, onReceived, onConnected, onDisconnected])

	const perform = (action: string, data?: Record<string, unknown>) => {
		if(subscriptionRef.current) {
			subscriptionRef.current.perform(action, data)
		}
	}

	const send = (data: Record<string, unknown>) => {
		if(subscriptionRef.current) {
			subscriptionRef.current.send(data)
		}
	}

	return { perform, send }
}
