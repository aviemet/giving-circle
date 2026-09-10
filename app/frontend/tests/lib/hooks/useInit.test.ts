import { renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import { useInit } from "@/lib/hooks/useInit"

describe("lib/hooks/useInit", () => {
	test("runs setup once and returned cleanup on unmount", () => {
		const callback = vi.fn()
		const cleanup = vi.fn()
		const { unmount } = renderHook(() => useInit(() => {
			callback()
			return cleanup
		}))

		expect(callback).toHaveBeenCalledTimes(1)
		unmount()
		expect(cleanup).toHaveBeenCalledTimes(1)
	})

	test("allows omitting cleanup", () => {
		const callback = vi.fn()
		const { unmount } = renderHook(() => useInit(() => {
			callback()
		}))

		expect(callback).toHaveBeenCalledTimes(1)
		unmount()
	})
})
