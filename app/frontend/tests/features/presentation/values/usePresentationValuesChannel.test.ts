import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

const { useActionCableMock } = vi.hoisted(() => ({
	useActionCableMock: vi.fn(),
}))

vi.mock("@/lib/hooks/useActionCable", () => ({
	useActionCable: useActionCableMock,
}))

describe("features/presentation/values/usePresentationValuesChannel", () => {
	test("subscribes to presentation values updates", async () => {
		useActionCableMock.mockImplementation(({ onReceived }) => {
			queueMicrotask(() => {
				onReceived?.({
					type: "presentation_values_updated",
					presentation_values: {
						allocated_totals: [
							{
								org_id: "org-1",
								allocated_cents: 10_000,
								currency: "USD",
							},
						],
						money_totals: [],
						vote_counts: [],
						rank_totals: [],
					},
				})
			})

			return { perform: vi.fn(), send: vi.fn() }
		})

		const onPresentationValuesUpdated = vi.fn()
		const { usePresentationValuesChannel } = await import(
			"@/features/presentation/values/usePresentationValuesChannel"
		)

		renderHook(() => usePresentationValuesChannel({
			presentationId: "presentation-1",
			onPresentationValuesUpdated,
		}))

		await waitFor(() => {
			expect(useActionCableMock).toHaveBeenCalledWith(expect.objectContaining({
				channelName: "PresentationValuesChannel",
				enabled: true,
				params: { presentation_id: "presentation-1" },
			}))
		})

		expect(onPresentationValuesUpdated).toHaveBeenCalledWith({
			allocated_totals: [
				{
					org_id: "org-1",
					allocated_cents: 10_000,
					currency: "USD",
				},
			],
			money_totals: [],
			vote_counts: [],
			rank_totals: [],
		})
	})
})
