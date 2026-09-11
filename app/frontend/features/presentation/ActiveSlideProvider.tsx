import { type ReactNode } from "react"

import { createContext as createAppContext } from "@/lib/hooks"

const [useActiveSlideContext, ActiveSlideContextProvider] = createAppContext<{ slideId: string }>()

export function useActiveSlideId(): string | undefined {
	const context = useActiveSlideContext(false)
	return context?.slideId
}

export function ActiveSlideProvider({
	slideId,
	children,
}: {
	slideId: string
	children: ReactNode
}) {
	return (
		<ActiveSlideContextProvider value={ { slideId } }>
			{ children }
		</ActiveSlideContextProvider>
	)
}

export function useActiveSlideIdRequired(): string {
	const slideId = useActiveSlideId()
	if(slideId === undefined) {
		throw new Error("useActiveSlideIdRequired must be used inside ActiveSlideProvider")
	}
	return slideId
}
