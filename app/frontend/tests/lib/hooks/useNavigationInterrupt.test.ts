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

	test("does not push a second history guard when one is already present", () => {
		const pushState = vi.spyOn(window.history, "pushState")
		window.history.replaceState({ navigationInterrupt: "slide-1" }, "")

		renderHook(() =>
			useNavigationInterrupt({
				enabled: true,
				historyGuardKey: "slide-1",
			}),
		)

		expect(pushState).not.toHaveBeenCalled()
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

	test("armed leave allows the pending inertia visit through the before guard", () => {
		const preventDefault = vi.fn()
		const beforeHandler = vi.fn()

		vi.mocked(router.on).mockImplementation((eventName, handler) => {
			if(eventName === "before") {
				beforeHandler.mockImplementation((event) => handler(event))
			}

			return vi.fn()
		})

		const visitSpy = vi.spyOn(router, "visit").mockImplementation((url) => {
			beforeHandler({
				preventDefault,
				detail: { visit: { url: String(url) } },
			})
		})

		const { result } = renderHook(() =>
			useNavigationInterrupt({
				enabled: true,
				historyGuardKey: "slide-1",
			}),
		)

		act(() => {
			beforeHandler({
				preventDefault,
				detail: { visit: { url: "/slides" } },
			})
		})

		expect(result.current.promptOpen).toBe(true)
		expect(preventDefault).toHaveBeenCalled()

		preventDefault.mockClear()

		act(() => {
			result.current.leaveAfterAction()
		})

		expect(visitSpy).toHaveBeenCalledWith("/slides", {})
		expect(preventDefault).not.toHaveBeenCalled()
		expect(result.current.promptOpen).toBe(false)

		visitSpy.mockRestore()
	})
})
