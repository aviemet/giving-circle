import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { useCircleFonts } from "@/queries/circles/fonts"

describe("queries/circles/fonts", () => {
	test("fetches circle fonts", async () => {
		const client = new QueryClient({
			defaultOptions: { queries: { retry: false } },
		})
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={ client }>{ children }</QueryClientProvider>
		)

		const { result } = renderHook(
			() => useCircleFonts({ circleSlug: "circle-1" }),
			{ wrapper },
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})
		expect(result.current.data).toEqual([])
	})
})
