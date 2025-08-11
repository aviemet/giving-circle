import { Head } from "@inertiajs/react"

import { Page, Section, Title } from "@/components"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PublicShowPresentationProps {
	presentation: Schema.PresentationsShow
	circle: Schema.CirclesPersisted
	meta?: React.ReactNode
}

// @path: /:circle_slug/p/:presentation_slug
// @route: circlePublicPresentation
const PublicShowPresentation = ({ presentation, circle, meta }: PublicShowPresentationProps) => {
	const { params } = usePageProps<"circlePublicPresentation">()
	const title = presentation.name || "Presentation"

	return (
		<>
			<Head title={ title }>
				{ meta && meta }
			</Head>
		</>
	)
}

export default withLayout(PublicShowPresentation, "unformatted")
