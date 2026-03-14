import { createContext } from "@/lib/hooks"

export interface PresentationDataContextValue {
	circle: Schema.CirclesMock | Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation?: Schema.PresentationsPresentation
	isEditor?: boolean
}

const [usePresentationDataContext, PresentationDataProvider] = createContext<PresentationDataContextValue>()
export { usePresentationDataContext, PresentationDataProvider }

