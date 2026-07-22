import { Head } from "@inertiajs/react"
import { useState } from "react"

import { SlidePresentation } from "@/components/SlidePresentation"
import { withLayout } from "@/lib"

import { useActivePresentationChannel } from "../useActivePresentationChannel"

interface PublicShowPresentationProps {
	presentation: Schema.PresentationsPresentation
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	meta?: React.ReactNode
}

// @path: /:circle_slug/p/:presentation_slug
// @route: circlePublicPresentation
const PublicShowPresentation = ({ presentation, circle, theme, meta }: PublicShowPresentationProps) => {
	const [activeSlideId, setActiveSlideId] = useState(
		presentation.active_slide_id || presentation.slides[0].id
	)

	const title = presentation.name || "Presentation"

	useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			setActiveSlideId(slideId)
		},
	})

	return (
		<>
			<Head title={ title }>
				{ meta && meta }
			</Head>

			<SlidePresentation
				presentation={ presentation }
				circle={ circle }
				theme={ theme }
				activeSlide={ presentation.slides.find(slide => slide.id === activeSlideId)! }
				transitionType="fade"
				transitionDuration={ 0.33 }
			/>
		</>
	)
}

export default withLayout(PublicShowPresentation, "publicPresentation")
