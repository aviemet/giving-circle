import { Title } from "@/components"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ActivePresentationControlsProps {
	presentation: Schema.PresentationsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const ActivePresentationControls = ({ presentation }: ActivePresentationControlsProps) => {
	const { active_presentation, active_theme } = usePageProps<"themePresentationControls">()
	console.log({ presentation })
	return (
		<>{ presentation.slides && presentation.slides.map((slide) => (
			<Title>{ slide.title }</Title>
		)) }</>
	)

}

export default withLayout(ActivePresentationControls, "presentation")
