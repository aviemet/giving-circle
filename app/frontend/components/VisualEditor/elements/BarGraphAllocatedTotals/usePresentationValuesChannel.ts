import { type PresentationValuesPayload } from "@/features/presentation"
import { useActionCable } from "@/lib/hooks/useActionCable"

interface PresentationValuesMessage {
	type: "presentation_values_updated"
	presentation_values: PresentationValuesPayload
}

interface UsePresentationValuesChannelOptions {
	presentationId: string
	enabled?: boolean
	onPresentationValuesUpdated?: (values: PresentationValuesPayload) => void
	onConnected?: () => void
	onDisconnected?: () => void
}

export const usePresentationValuesChannel = ({
	presentationId,
	enabled = true,
	onPresentationValuesUpdated,
	onConnected,
	onDisconnected,
}: UsePresentationValuesChannelOptions) => {
	useActionCable<PresentationValuesMessage>({
		channelName: "PresentationValuesChannel",
		enabled,
		params: { presentation_id: presentationId },
		onReceived: (data) => {
			if(data.type === "presentation_values_updated" && onPresentationValuesUpdated) {
				onPresentationValuesUpdated(data.presentation_values)
			}
		},
		onConnected,
		onDisconnected,
	})
}
