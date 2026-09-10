import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Stack, Text } from "@/components"
import { SwitchSlideButton } from "@/domains/presentations/Buttons/SwitchSlideButton"
import {
	ELEMENT_CONTROL_PANELS,
	scanSlideElements,
} from "@/features/presentation/elementControls"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import * as classes from "./SlideControlColumn.css"

type SlideControlSlide = Pick<Schema.SlidesShow, "id" | "data" | "slug" | "title" | "thumbnail_url">

interface SlideControlColumnProps {
	slide: SlideControlSlide
	active: boolean
	onSwitch: () => void
	elementControls: ElementControlsPayload
	circleSlug: string
	presentationSlug: string
	disabled?: boolean
	onElementControlsUpdated?: (elementControls: ElementControlsPayload) => void
}

export function SlideControlColumn({
	slide,
	active,
	onSwitch,
	elementControls,
	circleSlug,
	presentationSlug,
	disabled,
	onElementControlsUpdated,
}: SlideControlColumnProps) {
	const { t } = useTranslation()
	const controllableElements = scanSlideElements(slide.data)

	return (
		<Stack gap="sm" className={ clsx(classes.column) }>
			<SwitchSlideButton
				slide={ slide }
				active={ active }
				onClick={ onSwitch }
			/>

			{ controllableElements.length > 0 && (
				<Stack gap="sm" className={ clsx(classes.elementControls) }>
					{ controllableElements.map((element) => {
						const ControlPanel = ELEMENT_CONTROL_PANELS[element.elementType]

						return (
							<Stack key={ `${element.elementType}-${element.elementId}` } gap="xs" className={ clsx(classes.elementControlPanel) }>
								<Text size="xs" tt="uppercase" c="dimmed" fw={ 600 }>
									{ t(`presentations.active.controls.element_controls.${element.elementType.toLowerCase()}.label`) }
								</Text>
								<ControlPanel
									slideId={ slide.id }
									elementId={ element.elementId }
									elementControls={ elementControls }
									circleSlug={ circleSlug }
									presentationSlug={ presentationSlug }
									disabled={ disabled }
									onElementControlsUpdated={ onElementControlsUpdated }
								/>
							</Stack>
						)
					}) }
				</Stack>
			) }
		</Stack>
	)
}
