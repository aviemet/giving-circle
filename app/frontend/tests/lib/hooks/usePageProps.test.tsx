import { renderHook } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Providers } from "@/layouts/Providers"
import { usePageProps } from "@/lib/hooks/usePageProps"

describe("lib/hooks/usePageProps", () => {
	test("returns inertia page props", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Providers>{ children }</Providers>
		)
		const { result } = renderHook(() => usePageProps(), { wrapper })

		expect(result.current).toHaveProperty("auth")
		expect(result.current).toHaveProperty("params")
	})
})
