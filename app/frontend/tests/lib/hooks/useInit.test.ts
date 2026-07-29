import { renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import { useInit } from "@/lib/hooks/useInit"

describe("lib/hooks/useInit", () => {
	test("runs callback once and cleanup on unmount", () => {
		const callback = vi.fn()
		const cleanup = vi.fn()
		const { unmount } = renderHook(() => useInit(callback, cleanup))

		expect(callback).toHaveBeenCalledTimes(1)
		unmount()
		expect(cleanup).toHaveBeenCalledTimes(1)
	})
})
