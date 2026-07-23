import { useCallback, useMemo, useState, type ReactNode } from "react"

import { createContext } from "@/lib/hooks"

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
	isSubscribed: boolean
}

const [usePresentationDataContext, PresentationDataContextProvider] =
	createContext<PresentationDataContextValue>()

export { usePresentationDataContext }

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

	const handlePresentationValuesUpdated = useCallback((next: PresentationValuesPayload) => {
		setValues(next)
	}, [])

	usePresentationValuesChannel({
		presentationId: presentationId ?? "",
		enabled: isSubscribed,
		onPresentationValuesUpdated: handlePresentationValuesUpdated,
	})

	const contextValue = useMemo(
		() => ({
			...value,
			values,
			isSubscribed,
		}),
		[value, values, isSubscribed],
	)

	return (
		<PresentationDataContextProvider value={ contextValue }>
			{ children }
		</PresentationDataContextProvider>
	)
}
