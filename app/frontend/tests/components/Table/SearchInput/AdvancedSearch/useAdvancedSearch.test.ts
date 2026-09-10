import { act, renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useAdvancedSearch } from "@/components/Table/SearchInput/AdvancedSearch/useAdvancedSearch"

describe("useAdvancedSearch", () => {
	test("link updates in the same render cycle as setInputValue", () => {
		const { result } = renderHook(() =>
			useAdvancedSearch([{ name: "q", default: "" }]),
		)

		act(() => {
			result.current.setInputValue("q", "needle")
		})

		expect(result.current.link).toContain("q=needle")
		expect(result.current.link).toContain("adv=true")
	})

	test("parses date start values from URL strings", () => {
		window.history.pushState({}, "", "/?starts_on[start]=2024-01-15")

		const { result } = renderHook(() =>
			useAdvancedSearch([{ name: "starts_on", type: "date" }]),
		)

		const props = result.current.inputProps("starts_on[start]")
		expect(props.value).toBeInstanceOf(Date)
		if(!(props.value instanceof Date)) {
			expect.unreachable()
			return
		}
		expect(props.value.getFullYear()).toBe(2024)
	})
})
