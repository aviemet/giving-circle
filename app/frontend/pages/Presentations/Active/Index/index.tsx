import { useState } from "react"

import { Group } from "@/components"
import SwitchSlideButton from "@/features/presentations/Buttons/SwitchSlideButton"
import { withLayout } from "@/lib"
import { useActivePresentationChannel } from "@/lib/hooks/useActivePresentationChannel"

interface ActivePresentationControlsProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const ActivePresentationControls = ({ presentation }: ActivePresentationControlsProps) => {
	const [activeSlideId, setActiveSlideId] = useState(
		presentation.active_slide_id || presentation.slides[0].id
	)

	const { switchSlide } = useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			setActiveSlideId(slideId)
		},
	})

	return (
		<Group>{ presentation.slides && presentation.slides.map((slide) => (
			<SwitchSlideButton
				key={ slide.id }
				slide={ slide }
				active={ activeSlideId === slide.id }
				onClick={ () => switchSlide(slide.id) }
			/>
		)) }</Group>
	)

}

export default withLayout(ActivePresentationControls, "presentation")
