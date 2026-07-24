import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { InteractionToggles } from "@/domains/presentations/active/InteractionToggles"
import { Routes } from "@/lib"
import { render } from "@/tests/helpers/utils"

const mutateMock = vi.fn()
const mutationCallbacks = {
	onSuccess: undefined as ((data: {
		interactions: Array<{
			id: string
			slug: string
			name: string
			accepting_responses: boolean
		}>
	}) => void) | undefined,
}

vi.mock("@/queries", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/queries")>()
	return {
		...actual,
		useTogglePresentationInteraction: (options: {
			onSuccess?: typeof mutationCallbacks.onSuccess
		}) => {
			mutationCallbacks.onSuccess = options.onSuccess
			return {
				mutate: mutateMock,
				isPending: false,
			}
		},
	}
})

const interactions = [
	{
		id: "1",
		slug: "finalist-vote",
		name: "Finalist vote",
		accepting_responses: false,
	},
]

describe("domains/presentations/active/InteractionToggles", () => {
	test("renders a switch per interaction", () => {
		render(
			<InteractionToggles
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				interactions={ interactions }
			/>,
		)

		expect(screen.getByRole("switch", { name: "Finalist vote" })).toBeTruthy()
	})

	test("keeps optimistic state until mutation succeeds even with stale cable", async () => {
		const user = userEvent.setup()
		const { rerender } = render(
			<InteractionToggles
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				interactions={ interactions }
				cableInteractions={ [
					{ id: "1", slug: "finalist-vote", accepting_responses: false },
				] }
			/>,
		)

		const toggle = screen.getByRole("switch", { name: "Finalist vote" })
		await user.click(toggle)

		expect(mutateMock).toHaveBeenCalledWith({
			interactionSlug: "finalist-vote",
			accepting_responses: true,
		})
		expect(toggle).toBeChecked()

		rerender(
			<InteractionToggles
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				interactions={ interactions }
				cableInteractions={ [
					{ id: "1", slug: "finalist-vote", accepting_responses: false },
				] }
			/>,
		)

		expect(screen.getByRole("switch", { name: "Finalist vote" })).toBeChecked()

		mutationCallbacks.onSuccess?.({
			interactions: [
				{
					id: "1",
					slug: "finalist-vote",
					name: "Finalist vote",
					accepting_responses: true,
				},
			],
		})

		await waitFor(() => {
			expect(screen.getByRole("switch", { name: "Finalist vote" })).toBeChecked()
		})
	})

	test("member interact route is presentation-scoped", () => {
		expect(Routes.circlePresentationInteract("circle-1", "presentation-1")).toBe(
			"/circle-1/p/presentation-1/interact",
		)
	})
})
