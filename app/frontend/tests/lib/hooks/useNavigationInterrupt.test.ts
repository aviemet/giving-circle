import { router } from "@inertiajs/react"
import { act, renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import { useNavigationInterrupt } from "@/lib/hooks/useNavigationInterrupt"

describe("lib/hooks/useNavigationInterrupt", () => {
	test("registers inertia before listener when enabled", () => {
		const pushState = vi.spyOn(window.history, "pushState")

		const { unmount } = renderHook(() =>
			useNavigationInterrupt({
				enabled: true,
				historyGuardKey: "slide-1",
			}),
		)

		expect(router.on).toHaveBeenCalledWith("before", expect.any(Function))
		expect(pushState).toHaveBeenCalledWith({ navigationInterrupt: "slide-1" }, "")

		unmount()
		pushState.mockRestore()
	})

	test("does not register listeners when disabled", () => {
		vi.mocked(router.on).mockClear()

		renderHook(() =>
			useNavigationInterrupt({
				enabled: false,
				historyGuardKey: "slide-1",
			}),
		)

		expect(router.on).not.toHaveBeenCalled()
	})

	test("removes before listener on unmount", () => {
		const removeBeforeListener = vi.fn()
		vi.mocked(router.on).mockReturnValueOnce(removeBeforeListener)

		const { unmount } = renderHook(() =>
			useNavigationInterrupt({
				enabled: true,
				historyGuardKey: "slide-1",
			}),
		)

		act(() => {
			unmount()
		})

		expect(removeBeforeListener).toHaveBeenCalled()
	})
})
