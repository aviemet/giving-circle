import { type ButtonProps, Button } from "@/components"
import {
	usePresentationMessageStatus,
	useSendPresentationMessage,
	type PresentationMessageSendState,
} from "@/queries/messages"

type SendMessageButtonLabels = {
	ready: string
	sending: string
	finished: string
}

export interface SendMessageButtonProps extends ButtonProps {
	circleSlug: string
	presentationSlug: string
	messageSlug: string
	labels: SendMessageButtonLabels
	initialData?: PresentationMessageSendState
	membershipIds?: string[]
}

export function SendMessageButton({
	circleSlug,
	presentationSlug,
	messageSlug,
	labels,
	initialData,
	membershipIds,
	...props
}: SendMessageButtonProps) {
	const params = { circleSlug, presentationSlug, messageSlug }

	const { data } = usePresentationMessageStatus(params, {
		initialData,
	})
	const sendMessage = useSendPresentationMessage({ params })

	const status = data?.status
	const hasDeliveryResults = Object.keys(data?.delivery_results ?? {}).length > 0

	let state: keyof SendMessageButtonLabels = "ready"
	if(hasDeliveryResults || status === "finished") {
		state = "finished"
	} else if(sendMessage.isPending || status === "sending") {
		state = "sending"
	}

	return (
		<Button
			disabled={ state !== "ready" }
			loading={ state === "sending" }
			onClick={ () => {
				sendMessage.mutate(
					membershipIds === undefined
						? null
						: { membership_ids: membershipIds },
				)
			} }
			{ ...props }
		>
			{ labels[state] }
		</Button>
	)
}
