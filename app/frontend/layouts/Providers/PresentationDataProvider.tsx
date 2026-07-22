import { createContext } from "@/lib/hooks"

export type PresentationDataPresentation =
	| Schema.PresentationsInertiaShare
	| Schema.PresentationsPresentation

export interface PresentationDataContextValue {
	circle: Schema.CirclesMock | Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation?: PresentationDataPresentation
	isEditor?: boolean
}

const [usePresentationDataContext, PresentationDataProvider] = createContext<PresentationDataContextValue>()
export { usePresentationDataContext, PresentationDataProvider }

