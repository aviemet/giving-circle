import { useCallback, useMemo, useState, type ReactNode } from "react"

import { createContext } from "@/lib/hooks"
import { useActivePresentationChannel } from "@/pages/Presentations/Active/useActivePresentationChannel"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import {
	usePresentationValuesChannel,
	type PresentationValuesPayload,
} from "./values/usePresentationValuesChannel"

export type PresentationDataPresentation =
	| Schema.PresentationsInertiaShare
	| Schema.PresentationsPresentation

export interface PresentationDataValue {
	circle: Schema.CirclesMock | Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation?: PresentationDataPresentation
	isEditor?: boolean
}

export interface PresentationDataContextValue extends PresentationDataValue {
	values: PresentationValuesPayload | undefined
	elementControls: ElementControlsPayload
	activeSlideId: string | undefined
	isSubscribed: boolean
}

const [usePresentationDataContext, PresentationDataContextProvider] =
	createContext<PresentationDataContextValue>()

export { usePresentationDataContext }

function initialElementControls(
	presentation: PresentationDataPresentation | undefined,
): ElementControlsPayload {
	if(presentation === undefined) {
		return {}
	}

	if("element_controls" in presentation && presentation.element_controls !== undefined) {
		return presentation.element_controls
	}

	return {}
}

function initialActiveSlideId(
	presentation: PresentationDataPresentation | undefined,
): string | undefined {
	if(presentation === undefined) {
		return undefined
	}

	if("active_slide_id" in presentation && presentation.active_slide_id !== undefined) {
		return presentation.active_slide_id
	}

	if("slides" in presentation && presentation.slides.length > 0) {
		return presentation.slides[0]?.id
	}

	return undefined
}

export function PresentationDataProvider({
	value,
	children,
}: {
	value: PresentationDataValue
	children: ReactNode
}) {
	const presentationId = value.presentation && "id" in value.presentation
		? value.presentation.id
		: undefined
	const isEditor = value.isEditor === true
	const isSubscribed = !isEditor && Boolean(presentationId)

	const [values, setValues] = useState<PresentationValuesPayload | undefined>(undefined)
	const [elementControls, setElementControls] = useState<ElementControlsPayload>(
		() => initialElementControls(value.presentation),
	)
	const [activeSlideId, setActiveSlideId] = useState<string | undefined>(
		() => initialActiveSlideId(value.presentation),
	)

	const handlePresentationValuesUpdated = useCallback((next: PresentationValuesPayload) => {
		setValues(next)
	}, [])

	usePresentationValuesChannel({
		presentationId: presentationId ?? "",
		enabled: isSubscribed,
		onPresentationValuesUpdated: handlePresentationValuesUpdated,
	})

	useActivePresentationChannel({
		presentationId: presentationId ?? "",
		enabled: isSubscribed,
		onSlideSwitched: setActiveSlideId,
		onActivePresentationUpdated: (snapshot) => {
			if(snapshot.element_controls !== undefined) {
				setElementControls(snapshot.element_controls)
			}
		},
	})

	const contextValue = useMemo(
		() => ({
			...value,
			values,
			elementControls,
			activeSlideId,
			isSubscribed,
		}),
		[value, values, elementControls, activeSlideId, isSubscribed],
	)

	return (
		<PresentationDataContextProvider value={ contextValue }>
			{ children }
		</PresentationDataContextProvider>
	)
}
