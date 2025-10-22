import { useState } from "react"

import { Group, Menu, Page, Title } from "@/components"
import SwitchSlideButton from "@/features/presentations/Buttons/SwitchSlideButton"
import { Routes, withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useActivePresentationChannel } from "@/lib/hooks/useActivePresentationChannel"

interface ActivePresentationControlsProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const ActivePresentationControls = ({ presentation }: ActivePresentationControlsProps) => {
	const { params } = usePageProps<"themePresentationControls">()

	const [activeSlideId, setActiveSlideId] = useState(
		presentation.active_slide_id || presentation.slides[0].id
	)

	const { switchSlide } = useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			setActiveSlideId(slideId)
		},
	})

	const title = `${presentation.name} Controls`

	return (
		<Page
			title={ title }
			heading={ <>
				<Title>{ title }</Title>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.circlePublicPresentation(params.circle_slug, params.presentation_slug) } external>
								Launch Presentation
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
		>
			<Group>{ presentation.slides && presentation.slides.map((slide) => (
				<SwitchSlideButton
					key={ slide.id }
					slide={ slide }
					active={ activeSlideId === slide.id }
					onClick={ () => switchSlide(slide.id) }
				/>
			)) }</Group>
		</Page>
	)

}

export default withLayout(ActivePresentationControls, "presentation")
