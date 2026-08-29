import { Head } from "@inertiajs/react"

import { SlidePresentation } from "@/components/SlidePresentation"
import { usePresentationDataContext } from "@/features/presentation"
import { withLayout } from "@/lib"

interface PublicShowPresentationProps {
	presentation: Schema.PresentationsPresentation
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	meta?: React.ReactNode
}

// @path: /:circle_slug/p/:presentation_slug
// @route: circlePublicPresentation
const PublicShowPresentation = ({ presentation, circle, theme, meta }: PublicShowPresentationProps) => {
	const { activeSlideId } = usePresentationDataContext()

	const title = presentation.name || "Presentation"
	const activeSlide =
		presentation.slides.find(slide => slide.id === activeSlideId)
		?? presentation.slides[0]

	return (
		<>
			<Head title={ title }>
				{ meta && meta }
			</Head>

			<SlidePresentation
				presentation={ presentation }
				circle={ circle }
				theme={ theme }
				activeSlide={ activeSlide }
				transitionType="fade"
				transitionDuration={ 0.33 }
			/>
		</>
	)
}

export default withLayout(PublicShowPresentation, "publicPresentation")
