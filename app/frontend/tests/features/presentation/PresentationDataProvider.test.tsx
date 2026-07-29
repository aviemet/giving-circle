import { renderHook, waitFor } from "@testing-library/react"
import { type ReactNode } from "react"
import { describe, expect, test, vi } from "vitest"

import { fromCents } from "@/lib/money"
import { createCircleMock, createPresentationPresentation } from "@/tests/helpers/fixtures"

const { useActionCableMock } = vi.hoisted(() => ({
	useActionCableMock: vi.fn(),
}))

vi.mock("@/lib/hooks/useActionCable", () => ({
	useActionCable: useActionCableMock,
}))

const livePayload = {
	allocated_totals: [
		{
			org_id: "org-1",
			allocated_cents: 10_000,
			currency: "USD",
		},
	],
	money_totals: [{ total_cents: 50_000, currency: "USD" }],
	vote_counts: [],
	rank_totals: [],
}

describe("features/presentation/PresentationDataProvider", () => {
	test("subscribes once and fans out the same live values to readers", async () => {
		useActionCableMock.mockImplementation(({ onReceived, enabled }) => {
			if(enabled) {
				queueMicrotask(() => {
					onReceived?.({
						type: "presentation_values_updated",
						presentation_values: livePayload,
					})
				})
			}

			return { perform: vi.fn(), send: vi.fn() }
		})

		const {
			PresentationDataProvider,
			usePresentationDataContext,
		} = await import("@/features/presentation/PresentationDataProvider")

		const wrapper = ({ children }: { children: ReactNode }) => (
			<PresentationDataProvider value={ {
				circle: createCircleMock(),
				presentation: createPresentationPresentation(),
				isEditor: false,
			} }>
				{ children }
			</PresentationDataProvider>
		)

		const { result } = renderHook(
			() => ({
				first: usePresentationDataContext().values,
				second: usePresentationDataContext().values,
			}),
			{ wrapper },
		)

		await waitFor(() => {
			expect(result.current.first).toEqual(livePayload)
			expect(result.current.second).toEqual(livePayload)
		})

		expect(result.current.first).toBe(result.current.second)

		const enabledCalls = useActionCableMock.mock.calls.filter(
			([options]) => options.enabled === true,
		)
		expect(enabledCalls.length).toBeGreaterThan(0)
		expect(enabledCalls.every(([options]) => {
			return options.channelName === "PresentationValuesChannel"
				&& options.params?.presentation_id === "presentation-1"
		})).toBe(true)
	})

	test("does not subscribe in the editor", async () => {
		useActionCableMock.mockClear()
		useActionCableMock.mockImplementation(() => ({ perform: vi.fn(), send: vi.fn() }))

		const {
			PresentationDataProvider,
			usePresentationDataContext,
		} = await import("@/features/presentation/PresentationDataProvider")

		const wrapper = ({ children }: { children: ReactNode }) => (
			<PresentationDataProvider value={ {
				circle: createCircleMock(),
				presentation: createPresentationPresentation(),
				isEditor: true,
			} }>
				{ children }
			</PresentationDataProvider>
		)

		const { result } = renderHook(() => usePresentationDataContext().values, { wrapper })

		expect(result.current).toBeUndefined()
		expect(useActionCableMock).toHaveBeenCalledWith(expect.objectContaining({
			enabled: false,
		}))
	})
})

describe("features/presentation/values/leverageTotals", () => {
	test("deriveLeverageFromAsksAndAllocated subtracts allocated from ask total", async () => {
		const {
			deriveLeverageFromAsksAndAllocated,
			leverageFilledPercent,
		} = await import("@/features/presentation/values/leverageTotals")

		const totals = deriveLeverageFromAsksAndAllocated(
			[100_000, 200_000],
			"USD",
			{
				allocated_totals: [
					{ allocated_cents: 50_000 },
					{ allocated_cents: 25_000 },
				],
			},
		)

		expect(totals.total).toEqual(fromCents(300_000, "USD"))
		expect(totals.remaining).toEqual(fromCents(225_000, "USD"))
		expect(leverageFilledPercent(totals)).toBe(75)
	})

	test("buildMockLeverage returns stable editor preview amounts", async () => {
		const { buildMockLeverage, leverageFilledPercent } = await import(
			"@/features/presentation/values/leverageTotals"
		)
		const totals = buildMockLeverage("USD")

		expect(totals.remaining).toEqual(fromCents(6_000_000, "USD"))
		expect(totals.total).toEqual(fromCents(40_000_000, "USD"))
		expect(leverageFilledPercent(totals)).toBe(15)
	})
})
