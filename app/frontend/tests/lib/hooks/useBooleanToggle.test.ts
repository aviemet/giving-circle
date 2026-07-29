import { renderHook, act } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useBooleanToggle } from "@/lib/hooks/useBooleanToggle"

describe("lib/hooks/useBooleanToggle", () => {
	test("toggles and sets explicit values", () => {
		const { result } = renderHook(() => useBooleanToggle(false))

		expect(result.current[0]).toBe(false)

		act(() => {
			result.current[1]()
		})
		expect(result.current[0]).toBe(true)

		act(() => {
			result.current[1](true)
		})
		expect(result.current[0]).toBe(true)

		act(() => {
			result.current[1](false)
		})
		expect(result.current[0]).toBe(false)
	})
})
