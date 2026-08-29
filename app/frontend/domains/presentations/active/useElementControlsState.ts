import { useMemo, useState } from "react"

import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

function elementControlsEqual(
	left: ElementControlsPayload | undefined,
	right: ElementControlsPayload | undefined,
) {
	return JSON.stringify(left ?? {}) === JSON.stringify(right ?? {})
}

export function useElementControlsState(
	serverElementControls: ElementControlsPayload | undefined,
	cableElementControls: ElementControlsPayload | undefined,
) {
	const [mutationSnapshot, setMutationSnapshot] = useState<ElementControlsPayload | null>(null)

	const elementControls = useMemo(() => {
		const cableCaughtUp = mutationSnapshot !== null
			&& elementControlsEqual(mutationSnapshot, cableElementControls)

		if(cableElementControls !== undefined && (mutationSnapshot === null || cableCaughtUp)) {
			return cableElementControls
		}

		if(mutationSnapshot !== null) {
			return mutationSnapshot
		}

		return serverElementControls ?? {}
	}, [serverElementControls, cableElementControls, mutationSnapshot])

	return {
		elementControls,
		setMutationSnapshot,
	}
}
