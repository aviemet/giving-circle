import { renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useColorSchemeOption } from "@/lib/hooks/useColorSchemeOption"

describe("lib/hooks/useColorSchemeOption", () => {
	test("returns light or dark option for current scheme", () => {
		const { result } = renderHook(() => useColorSchemeOption("light-value", "dark-value"))
		expect(["light-value", "dark-value"]).toContain(result.current)
	})
})
