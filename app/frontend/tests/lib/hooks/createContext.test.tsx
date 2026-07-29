import { renderHook } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { createContext } from "@/lib/hooks/createContext"

describe("lib/hooks/createContext", () => {
	test("provides and reads context value", () => {
		const [useValue, Provider] = createContext<{ label: string }>()

		const { result } = renderHook(() => useValue(), {
			wrapper: ({ children }) => (
				<Provider value={ { label: "hello" } }>{ children }</Provider>
			),
		})

		expect(result.current.label).toBe("hello")
	})

	test("throws outside provider by default", () => {
		const [useValue] = createContext<{ label: string }>()

		expect(() => renderHook(() => useValue())).toThrow(/must be inside a Provider/)
	})

	test("returns null outside provider when error is false", () => {
		const [useValue] = createContext<{ label: string }>()
		const { result } = renderHook(() => useValue(false))
		expect(result.current).toBeNull()
	})
})
