import { router } from "@inertiajs/react"
import { afterEach, describe, expect, test, vi } from "vitest"

import { navigateBack } from "@/lib/navigation"

describe("lib/navigation", () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test("navigateBack replaces then goes back", () => {
		vi.useFakeTimers()
		const visit = vi.spyOn(router, "visit").mockImplementation(() => undefined)
		const historyBack = vi.spyOn(window.history, "back").mockImplementation(() => undefined)

		navigateBack()

		expect(visit).toHaveBeenCalledWith(
			window.location.pathname + window.location.search,
			{ replace: true },
		)

		vi.runAllTimers()
		expect(historyBack).toHaveBeenCalled()
		vi.useRealTimers()
	})
})
