import { renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useCurrency } from "@/lib/hooks/useCurrency"

describe("lib/hooks/useCurrency", () => {
	test("formats numeric amounts", () => {
		const { result } = renderHook(() => useCurrency({ amount: 12.5, currency: "USD", locale: "en-US" }))
		expect(result.current[0]).toBe(12.5)
		expect(result.current[1].format(result.current[0])).toContain("12.50")
	})

	test("reads Money objects", () => {
		const { result } = renderHook(() => useCurrency({
			amount: { amount: 3, cents: 300, currency_iso: "EUR" },
			locale: "en-US",
		}))
		expect(result.current[0]).toBe(3)
		expect(result.current[1].resolvedOptions().currency).toBe("EUR")
	})

	test("defaults null amount to zero", () => {
		const { result } = renderHook(() => useCurrency({ amount: null, currency: "USD", locale: "en-US" }))
		expect(result.current[0]).toBe(0)
	})
})
