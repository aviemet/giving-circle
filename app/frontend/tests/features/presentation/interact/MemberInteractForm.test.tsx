import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { IdleState, MemberInteractForm } from "@/features/presentation"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

vi.mock("@/pages/Presentations/Active/useActivePresentationChannel", () => ({
	useActivePresentationChannel: () => ({}),
}))

const circle = createCirclePersisted({ id: "circle-1", slug: "circle-1", name: "Circle" })
const presentation = createPresentationPresentation({
	id: "presentation-1",
	slug: "presentation-1",
	name: "Presentation",
	active: true,
})

describe("features/presentation/interact", () => {
	test("IdleState renders waiting copy", () => {
		render(<IdleState />)

		expect(screen.getByRole("heading", { name: /waiting for the next activity/i })).toBeTruthy()
	})

	test("MemberInteractForm renders allocation voting cards", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ { amount: 100, cents: 10_000, currency_iso: "USD" } }
				availableVotes={ null }
				activeInteraction={ {
					id: "interaction-1",
					name: "Allocation Round",
					slug: "allocation-round",
					accepting_responses: true,
					interaction_ui_template: {
						id: "ui-1",
						slug: "allocation",
						name: "Allocation",
					},
					config: {
						fields: [
							{
								key: "allocations",
								type: "org_money_map",
								label: "Allocate to organizations",
							},
						],
						outputs: [],
					},
					context: {
						presentation_orgs: [org],
					},
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Allocation Round" })).toBeTruthy()
		expect(screen.getByText("Org One")).toBeTruthy()
		expect(screen.getByRole("button", { name: /finalize vote/i })).toBeDisabled()
		expect(screen.getByText(/funds left to allocate/i)).toBeTruthy()
	})

	test("Finalize Vote enables when partial submit is checked", async () => {
		const user = userEvent.setup()
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ { amount: 100, cents: 10_000, currency_iso: "USD" } }
				availableVotes={ null }
				activeInteraction={ {
					id: "interaction-1",
					name: "Allocation Round",
					slug: "allocation-round",
					accepting_responses: true,
					interaction_ui_template: {
						id: "ui-1",
						slug: "allocation",
						name: "Allocation",
					},
					config: {
						fields: [
							{
								key: "allocations",
								type: "org_money_map",
								label: "Allocate to organizations",
							},
						],
						outputs: [],
					},
					context: {
						presentation_orgs: [org],
					},
				} }
			/>,
		)

		const finalize = screen.getByRole("button", { name: /finalize vote/i })
		expect(finalize).toBeDisabled()

		await user.click(screen.getByLabelText(/submit without allocating all funds/i))

		expect(finalize).toBeEnabled()
	})

	test("MemberInteractForm renders finalist vote cards", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ null }
				availableVotes={ 10 }
				activeInteraction={ {
					id: "interaction-2",
					name: "Finalist Vote",
					slug: "finalist-vote",
					accepting_responses: true,
					interaction_ui_template: {
						id: "ui-2",
						slug: "finalist_vote",
						name: "Finalist vote",
					},
					config: {
						fields: [
							{
								key: "votes",
								type: "org_money_map",
								label: "Cast your votes",
							},
						],
						outputs: [],
						settings: { finalist_count: 5, default_votes: 10 },
					},
					context: {
						presentation_orgs: [org],
						settings: { finalist_count: 5 },
					},
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Finalist Vote" })).toBeTruthy()
		expect(screen.getByText(/votes left/i)).toBeTruthy()
	})

	test("MemberInteractForm renders nothing for finalist vote without availableVotes", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ null }
				availableVotes={ null }
				activeInteraction={ {
					id: "interaction-2",
					name: "Finalist Vote",
					slug: "finalist-vote",
					accepting_responses: true,
					interaction_ui_template: {
						id: "ui-2",
						slug: "finalist_vote",
						name: "Finalist vote",
					},
					config: {
						fields: [
							{
								key: "votes",
								type: "org_money_map",
								label: "Cast your votes",
							},
						],
						outputs: [],
						settings: { finalist_count: 5, default_votes: 10 },
					},
					context: {
						presentation_orgs: [org],
						settings: { finalist_count: 5 },
					},
				} }
			/>,
		)

		expect(screen.queryByRole("heading", { name: "Finalist Vote" })).toBeNull()
		expect(screen.queryByText(/votes left/i)).toBeNull()
	})
})
