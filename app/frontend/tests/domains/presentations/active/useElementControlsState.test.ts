import { act, renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useElementControlsState } from "@/domains/presentations/active/useElementControlsState"

describe("domains/presentations/active/useElementControlsState", () => {
	test("uses cable values after mutation and cable reconcile", () => {
		const cableControls = {
			"slide-1": {
				"timer-1": {
					Timer: {
						duration: { minutes: 2, seconds: 0 },
					},
				},
			},
		}

		const { result, rerender } = renderHook(
			({ cable }) => useElementControlsState({}, cable),
			{ initialProps: { cable: undefined as typeof cableControls | undefined } },
		)

		act(() => {
			result.current.setMutationSnapshot(cableControls)
		})

		expect(result.current.elementControls).toEqual(cableControls)

		rerender({ cable: cableControls })

		expect(result.current.elementControls).toEqual(cableControls)
	})
})
