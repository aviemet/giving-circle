import { Group, Title } from "@/components"
import SwitchSlideButton from "@/features/presentations/Buttons/SwitchSlideButton"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useActivePresentationChannel } from "@/lib/hooks/useActivePresentationChannel"

interface ActivePresentationControlsProps {
	presentation: Schema.PresentationsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const ActivePresentationControls = ({ presentation }: ActivePresentationControlsProps) => {
	const { active_presentation, active_theme } = usePageProps<"themePresentationControls">()

	const { switchSlide } = useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			console.log("Slide switched to:", slideId)
		},
		onConnected: () => {
			console.log("Connected to presentation channel")
		},
	})

	return (
		<Group>{ presentation.slides && presentation.slides.map((slide) => (
			<SwitchSlideButton
				key={ slide.id }
				slide={ slide }
				onClick={ () => switchSlide(slide.id) }
			/>
		)) }</Group>
	)

}

export default withLayout(ActivePresentationControls, "presentation")
