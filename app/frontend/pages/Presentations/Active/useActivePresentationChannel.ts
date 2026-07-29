import { useActionCable } from "@/lib/hooks/useActionCable"

interface ActivePresentationInteractionSnapshot {
	id: string
	slug: string
	accepting_responses: boolean
}

interface ActivePresentationSnapshot {
	interactions?: ActivePresentationInteractionSnapshot[]
}

interface ActivePresentationMessage {
	type: "slide_switched" | "slide_updated" | "active_presentation_updated"
	active_slide?: string
	slide_id?: string
	content?: string
	active_presentation?: ActivePresentationSnapshot
}

interface UseActivePresentationChannelOptions {
	presentationId: string
	onSlideSwitched?: (slideId: string) => void
	onSlideUpdated?: (slideId: string, content: string) => void
	onActivePresentationUpdated?: (snapshot: ActivePresentationSnapshot) => void
	onConnected?: () => void
	onDisconnected?: () => void
}

export const useActivePresentationChannel = ({
	presentationId,
	onSlideSwitched,
	onSlideUpdated,
	onActivePresentationUpdated,
	onConnected,
	onDisconnected,
}: UseActivePresentationChannelOptions) => {
	const { perform } = useActionCable<ActivePresentationMessage>({
		channelName: "ActivePresentationChannel",

		params: { presentation_id: presentationId },

		onReceived: (data) => {
			switch(data.type) {
				case "slide_switched":
					if(data.active_slide && onSlideSwitched) {
						onSlideSwitched(data.active_slide)
					}
					break
				case "slide_updated":
					if(data.slide_id && data.content && onSlideUpdated) {
						onSlideUpdated(data.slide_id, data.content)
					}
					break
				case "active_presentation_updated":
					if(data.active_presentation && onActivePresentationUpdated) {
						onActivePresentationUpdated(data.active_presentation)
					}
					break
			}
		},
		onConnected,
		onDisconnected,
	})

	const switchSlide = (slideId: string) => {
		perform("switch_slide", {
			presentation_id: presentationId,
			slide_id: slideId,
		})
	}

	const updateSlide = (slideId: string, content: string) => {
		perform("update_slide", {
			presentation_id: presentationId,
			slide_id: slideId,
			content,
		})
	}

	return {
		switchSlide,
		updateSlide,
	}
}
