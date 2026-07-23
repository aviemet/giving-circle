import { useActionCable } from "@/lib/hooks/useActionCable"

interface PresentationValuesAllocatedTotal {
	org_id: string
	allocated_cents: number
	currency: string
}

interface PresentationValuesMoneyTotal {
	total_cents: number
	currency: string
}

interface PresentationValuesVoteCount {
	value: string
	count: number
}

interface PresentationValuesRankTotal {
	org_id: string
	score: number
}

export interface PresentationValuesPayload {
	allocated_totals: PresentationValuesAllocatedTotal[]
	money_totals: PresentationValuesMoneyTotal[]
	vote_counts: PresentationValuesVoteCount[]
	rank_totals: PresentationValuesRankTotal[]
}

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

export function usePresentationValuesChannel({
	presentationId,
	enabled = true,
	onPresentationValuesUpdated,
	onConnected,
	onDisconnected,
}: UsePresentationValuesChannelOptions) {
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
