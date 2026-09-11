import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { MemberInteractForm } from "@/features/presentation"
import {
	createAllocationMemberUi,
	createCirclePersisted,
	createFinalistVoteMemberUi,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

vi.mock("@/lib/hooks/useActionCable", () => ({
	useActionCable: () => ({ perform: vi.fn(), send: vi.fn() }),
}))

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

describe("features/presentation/interactions", () => {
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
					member_ui: createAllocationMemberUi(),
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Allocation" })).toBeTruthy()
		expect(screen.getByText("Org One")).toBeTruthy()
		expect(screen.getByRole("button", { name: /finalize vote/i })).toBeEnabled()
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
					member_ui: createAllocationMemberUi(),
				} }
			/>,
		)

		const finalize = screen.getByRole("button", { name: /finalize vote/i })
		expect(finalize).toBeEnabled()

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
						settings: { default_votes: 10 },
					},
					context: {
						presentation_orgs: [org],
						settings: { default_votes: 10 },
					},
					member_ui: createFinalistVoteMemberUi(),
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Finalist vote" })).toBeTruthy()
		expect(screen.getByText(/votes left/i)).toBeTruthy()
	})

	test("MemberInteractForm still renders finalist vote UI without availableVotes", () => {
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
						settings: { default_votes: 10 },
					},
					context: {
						presentation_orgs: [org],
						settings: { default_votes: 10 },
					},
					member_ui: createFinalistVoteMemberUi(),
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Finalist vote" })).toBeTruthy()
		expect(screen.getByText(/votes left/i)).toBeTruthy()
	})

	test("MemberInteractForm shows unsupported copy for unknown ui slug", () => {
		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ null }
				availableVotes={ null }
				activeInteraction={ {
					id: "interaction-3",
					name: "Custom Interaction",
					slug: "custom",
					accepting_responses: true,
					interaction_ui_template: {
						id: "ui-3",
						slug: "not_a_real_ui",
						name: "Unknown",
					},
					config: {
						fields: [],
						outputs: [],
					},
					context: {},
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Custom Interaction" })).toBeTruthy()
		expect(screen.getByText(/interaction ui is not available/i)).toBeTruthy()
	})

	test("AllocationVoteForm shows update label when response already exists", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ { amount: 100, cents: 10_000, currency_iso: "USD" } }
				availableVotes={ null }
				responseData={ {
					allocations: [{ org_id: "org-1", amount_cents: 10_000 }],
				} }
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
					member_ui: createAllocationMemberUi(),
				} }
			/>,
		)

		expect(screen.getByRole("button", { name: /update vote/i })).toBeEnabled()
	})

	test("MemberInteractForm renders allocation UI from member_ui even when config fields are empty", () => {
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
						fields: [],
						outputs: [],
					},
					context: {
						presentation_orgs: [org],
					},
					member_ui: createAllocationMemberUi(),
				} }
			/>,
		)

		expect(screen.getByRole("heading", { name: "Allocation" })).toBeTruthy()
		expect(screen.getByText("Org One")).toBeTruthy()
	})

	test("FinalistVoteForm enables submit when partial votes allowed", async () => {
		const user = userEvent.setup()
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
						settings: { default_votes: 10 },
					},
					context: {
						presentation_orgs: [org],
						settings: { default_votes: 10 },
					},
					member_ui: createFinalistVoteMemberUi(),
				} }
			/>,
		)

		const finalize = screen.getByRole("button", { name: /finalize vote/i })
		expect(finalize).toBeEnabled()

		await user.click(screen.getByLabelText(/submit without using all votes/i))

		expect(finalize).toBeEnabled()
	})

	test("FinalistVoteForm shows update label when response already exists", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })

		render(
			<MemberInteractForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				availableFunds={ null }
				availableVotes={ 10 }
				responseData={ {
					votes: [{ org_id: "org-1", amount_cents: 10 }],
				} }
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
						settings: { default_votes: 10 },
					},
					context: {
						presentation_orgs: [org],
						settings: { default_votes: 10 },
					},
					member_ui: createFinalistVoteMemberUi(),
				} }
			/>,
		)

		expect(screen.getByRole("button", { name: /update vote/i })).toBeEnabled()
	})
})
