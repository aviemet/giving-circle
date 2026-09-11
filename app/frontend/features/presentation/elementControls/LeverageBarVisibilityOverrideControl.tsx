import { useTranslation } from "react-i18next"

import { Switch } from "@/components/Inputs"
import { useUpdateElementControl } from "@/queries/presentations/elementControls"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import { type ElementControlPanelProps } from "./elementControlPanels"
import { readElementControlValue } from "./readElementControlValue"

export function leverageBarIsVisible(
	slideId: string | undefined,
	elementId: string | undefined,
	elementControls: ElementControlsPayload | undefined,
): boolean {
	if(slideId === undefined || elementId === undefined) {
		return true
	}

	const storedValue = readElementControlValue(
		elementControls,
		slideId,
		elementId,
		"LeverageBar",
		"visibility",
	)

	return storedValue?.visible !== false
}

export function LeverageBarVisibilityOverrideControl({
	slideId,
	elementId,
	elementControls,
	circleSlug,
	presentationSlug,
	disabled,
	onElementControlsUpdated,
}: ElementControlPanelProps) {
	const { t } = useTranslation()

	const { mutate, isPending } = useUpdateElementControl({
		params: {
			circleSlug,
			presentationSlug,
		},
		onSuccess: (data) => {
			onElementControlsUpdated?.(data.element_controls)
		},
	})

	return (
		<Switch
			label={ t("presentations.active.controls.element_controls.leveragebar.visible") }
			checked={ leverageBarIsVisible(slideId, elementId, elementControls) }
			disabled={ disabled === true || isPending }
			onChange={ (event) => {
				mutate({
					slideId,
					elementId,
					elementType: "LeverageBar",
					control: "visibility",
					value: { visible: event.currentTarget.checked },
				})
			} }
		/>
	)
}
