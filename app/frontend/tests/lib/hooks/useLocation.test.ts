import { act, renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useLocation } from "@/lib/hooks/useLocation"

describe("lib/hooks/useLocation", () => {
	test("exposes path params and nested params", () => {
		const { result } = renderHook(() => useLocation())

		expect(result.current.path).toContain(window.location.origin)
		expect(Array.isArray(result.current.paths)).toBe(true)
		expect(result.current.params).toBeInstanceOf(URLSearchParams)
		expect(typeof result.current.paramsAsJson).toBe("object")
		expect(result.current.nestedParams).toBeTruthy()
		expect(typeof result.current.toString()).toBe("string")
	})

	test("updates on popstate", () => {
		const { result } = renderHook(() => useLocation())
		const before = result.current.href

		act(() => {
			window.dispatchEvent(new PopStateEvent("popstate"))
		})

		expect(result.current.href).toBe(before)
	})
})
