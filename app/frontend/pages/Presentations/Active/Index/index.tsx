import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Group, Page, Section, Stack, Title } from "@/components"
import { InteractionToggles } from "@/domains/presentations/active/InteractionToggles"
import { SwitchSlideButton } from "@/domains/presentations/Buttons/SwitchSlideButton"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import { useActivePresentationChannel } from "../useActivePresentationChannel"

interface ActivePresentationControlsProps {
	presentation: Schema.PresentationsShow
	interactions: Schema.PresentationInteractionsControls[]
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin
// @route: themePresentationControls
const ActivePresentationControls = ({
	presentation,
	interactions,
}: ActivePresentationControlsProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationControls">()
	const [activeSlideId, setActiveSlideId] = useState(
		presentation.slides[0]?.id,
	)
	const [cableInteractions, setCableInteractions] = useState<Array<{
		id: string
		slug: string
		accepting_responses: boolean
	}> | undefined>()

	const { switchSlide } = useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			setActiveSlideId(slideId)
		},
		onActivePresentationUpdated: (snapshot) => {
			if(snapshot.interactions) {
				setCableInteractions(snapshot.interactions)
			}
		},
	})

	const title = `${presentation.name} Controls`

	return (
		<Page
			title={ title }
			heading={ <Title>{ title }</Title> }
		>
			<Stack gap="xl">
				<Section>
					<Stack gap="md">
						<Title order={ 3 }>{ t("presentations.active.controls.slides") }</Title>
						<Group>{ presentation.slides && presentation.slides.map((slide) => (
							<SwitchSlideButton
								key={ slide.id }
								slide={ slide }
								active={ activeSlideId === slide.id }
								onClick={ () => switchSlide(slide.id) }
							/>
						)) }</Group>
					</Stack>
				</Section>

				<Section>
					<Stack gap="md">
						<Title order={ 3 }>{ t("presentations.active.controls.interactions") }</Title>
						<InteractionToggles
							circleSlug={ params.circle_slug }
							presentationSlug={ params.presentation_slug }
							interactions={ interactions }
							cableInteractions={ cableInteractions }
						/>
					</Stack>
				</Section>
			</Stack>
		</Page>
	)
}

export default withLayout(ActivePresentationControls, "presentation")
