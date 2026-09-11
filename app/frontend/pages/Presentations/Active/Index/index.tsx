import clsx from "clsx"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Page, Section, Stack, Title } from "@/components"
import { InteractionToggles } from "@/domains/presentations/active/InteractionToggles"
import { SlideControlColumn } from "@/domains/presentations/active/SlideControlColumn"
import { useElementControlsState } from "@/domains/presentations/active/useElementControlsState"
import { withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import { useActivePresentationChannel } from "../useActivePresentationChannel"
import * as classes from "./Index.css"

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
	const [cableElementControls, setCableElementControls] = useState<ElementControlsPayload | undefined>()

	const { elementControls, setMutationSnapshot } = useElementControlsState(
		presentation.element_controls,
		cableElementControls,
	)

	const { switchSlide } = useActivePresentationChannel({
		presentationId: presentation.id,
		onSlideSwitched: (slideId) => {
			setActiveSlideId(slideId)
		},
		onActivePresentationUpdated: (snapshot) => {
			if(snapshot.interactions) {
				setCableInteractions(snapshot.interactions)
			}
			if(snapshot.element_controls) {
				setCableElementControls(snapshot.element_controls)
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
						<Box className={ clsx(classes.slides) }>
							{ presentation.slides && presentation.slides.map((slide) => (
								<SlideControlColumn
									key={ slide.id }
									slide={ slide }
									active={ activeSlideId === slide.id }
									onSwitch={ () => switchSlide(slide.id) }
									elementControls={ elementControls }
									circleSlug={ params.circle_slug }
									presentationSlug={ params.presentation_slug }
									onElementControlsUpdated={ setMutationSnapshot }
								/>
							)) }
						</Box>
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
