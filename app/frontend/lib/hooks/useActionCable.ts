import { useEffect, useRef } from "react"

import { createChannel } from "../actioncable"

interface UseActionCableOptions<T = unknown> {
	channelName: string
	params?: Record<string, unknown>
	enabled?: boolean
	onReceived?: (data: T) => void
	onConnected?: () => void
	onDisconnected?: () => void
}

export const useActionCable = <T = unknown>({
	channelName,
	params,
	enabled = true,
	onReceived,
	onConnected,
	onDisconnected,
}: UseActionCableOptions<T>) => {
	const subscriptionRef = useRef<ReturnType<typeof createChannel> | null>(null)
	const onReceivedRef = useRef(onReceived)
	const onConnectedRef = useRef(onConnected)
	const onDisconnectedRef = useRef(onDisconnected)
	const paramsRef = useRef(params)
	const paramsKey = JSON.stringify(params ?? {})

	useEffect(() => {
		onReceivedRef.current = onReceived
		onConnectedRef.current = onConnected
		onDisconnectedRef.current = onDisconnected
		paramsRef.current = params
	})

	useEffect(() => {
		if(!enabled) {
			return
		}

		subscriptionRef.current = createChannel(channelName, {
			received: (data) => {
				onReceivedRef.current?.(data)
			},
			connected: () => {
				onConnectedRef.current?.()
			},
			disconnected: () => {
				onDisconnectedRef.current?.()
			},
		}, paramsRef.current)

		return () => {
			if(subscriptionRef.current) {
				subscriptionRef.current.unsubscribe()
				subscriptionRef.current = null
			}
		}
	}, [channelName, enabled, paramsKey])

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
