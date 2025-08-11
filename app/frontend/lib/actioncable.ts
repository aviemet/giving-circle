import { createConsumer } from "@rails/actioncable"


const consumer = createConsumer("/ws")

export const createChannel = (channelName: string, callbacks: {
	connected?: () => void
	received?: (data: any) => void
	disconnected?: () => void
}, params?: Record<string, unknown>) => {
	return consumer.subscriptions.create({ channel: channelName, ...params }, callbacks)
}
