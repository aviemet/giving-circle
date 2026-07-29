import { MantineProvider } from "@mantine/core"
import { renderHook } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { useContrastingTextColor } from "@/lib/hooks/useContrastingTextColor"

describe("lib/hooks/useContrastingTextColor", () => {
	test("returns black or white for light and dark colors", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<MantineProvider>{ children }</MantineProvider>
		)

		expect(renderHook(() => useContrastingTextColor("#ffffff"), { wrapper }).result.current).toBe("black")
		expect(renderHook(() => useContrastingTextColor("#000000"), { wrapper }).result.current).toBe("white")
		expect(renderHook(() => useContrastingTextColor("blue"), { wrapper }).result.current).toMatch(/black|white/)
	})
})
