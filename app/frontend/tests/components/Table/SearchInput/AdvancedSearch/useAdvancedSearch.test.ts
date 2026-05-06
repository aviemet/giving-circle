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
})
