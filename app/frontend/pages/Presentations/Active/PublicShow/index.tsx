import { Head } from "@inertiajs/react"

import { Page, Section, Title } from "@/components"
import SlidePresentation from "@/components/SlidePresentation"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useActivePresentationChannel } from "@/lib/hooks/useActivePresentationChannel"


interface PublicShowPresentationProps {
	presentation: Schema.PresentationsPresentation
	circle: Schema.CirclesPersisted
	meta?: React.ReactNode
}

// @path: /:circle_slug/p/:presentation_slug
// @route: circlePublicPresentation
const PublicShowPresentation = ({ presentation, circle, meta }: PublicShowPresentationProps) => {
	const { params } = usePageProps<"circlePublicPresentation">()
	const title = presentation.name || "Presentation"

	useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			console.log("Slide switched to:", slideId)
		},
		onConnected: () => {
			console.log("Connected to presentation channel")
		},
	})

	return (
		<>
			<Head title={ title }>
				{ meta && meta }
			</Head>

			<SlidePresentation
				presentation={ presentation }
			/>
		</>
	)
}

export default withLayout(PublicShowPresentation, "unformatted")
