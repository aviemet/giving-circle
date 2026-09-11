import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { PresentationInteractionForm } from "@/domains/presentation/interactions/Form"
import { createInteractionUiTemplate, createPresentationInteractionsFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

function finalistVoteConfig(): Schema.PresentationInteractionsFormData["config"] {
	return {
		fields: [{ key: "votes", type: "org_money_map", label: "Votes" }],
		outputs: [{ metric: "org_vote_totals", source_field: "votes", reducer: "sum_by_org" }],
		settings: { default_votes: 10 },
	} as unknown as Schema.PresentationInteractionsFormData["config"]
}

function createNewInteractionFormData(
	overrides?: Partial<Schema.PresentationInteractionsFormData>,
) {
	return createPresentationInteractionsFormData({
		name: "",
		interaction_ui_template: undefined as unknown as Schema.InteractionUiTemplatesPersisted,
		config: {},
		...overrides,
	})
}

describe("domains/presentation/interactions/Form/PresentationInteractionForm", () => {
	test("renders interaction type first, then details, and create submit", () => {
		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createNewInteractionFormData() }
			/>,
		)

		expect(screen.getByRole("listbox", { name: "Interaction type" })).toBeTruthy()
		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByText("Trigger type")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Create Interaction" })).toBeTruthy()
	})

	test("shows update submit when interaction already has an id", () => {
		render(
			<PresentationInteractionForm
				to="/interactions/1"
				method="patch"
				presentation_interaction={ createPresentationInteractionsFormData({ id: "interaction-1" }) }
			/>,
		)

		expect(screen.getByRole("button", { name: "Update Interaction" })).toBeTruthy()
	})

	test("selecting finalist vote shows settings and answer pipeline", async () => {
		const user = userEvent.setup()

		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createNewInteractionFormData() }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Finalist vote/i }))

		expect(screen.getByText("Default votes per member")).toBeTruthy()
		expect(screen.getByText("Number of finalists")).toBeTruthy()
		expect(screen.getByText("Answers and live results")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Add another answer" })).toBeTruthy()
	})

	test("selecting allocation shows answer pipeline on new form", async () => {
		const user = userEvent.setup()

		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createNewInteractionFormData() }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Allocation/i }))

		expect(screen.getByText("Answers and live results")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Add another answer" })).toBeTruthy()
	})

	test("selecting a custom interaction type shows the answer pipeline starter", async () => {
		const user = userEvent.setup()

		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createNewInteractionFormData({
					interaction_ui_templates: [
						createInteractionUiTemplate({ id: "ui-1", name: "Allocation", slug: "allocation" }),
						createInteractionUiTemplate({ id: "ui-4", name: "Organization vote", slug: "org_vote" }),
					],
				}) }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Organization vote/i }))

		expect(screen.getByText("Saved recipe")).toBeTruthy()
		expect(screen.getByText("Answers and live results")).toBeTruthy()
	})

	test("selecting pledges screen shows pledge settings", async () => {
		const user = userEvent.setup()

		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createNewInteractionFormData() }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Pledges/i }))

		expect(screen.getByText("Allow pledges to non-finalists")).toBeTruthy()
		expect(screen.getByText("Allow pledges over organization ask")).toBeTruthy()
	})

	test("new form without a type selected prompts for interaction type", () => {
		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createNewInteractionFormData() }
			/>,
		)

		expect(screen.getByText(/Select an interaction type/i)).toBeTruthy()
		expect(screen.queryByText("Answers and live results")).toBeNull()
	})

	test("edit form locks interaction type but shows the same sections as new", () => {
		const finalistUi = createInteractionUiTemplate({ id: "ui-2", name: "Finalist vote", slug: "finalist_vote" })

		render(
			<PresentationInteractionForm
				to="/interactions/finalist-vote"
				method="patch"
				presentation_interaction={ createPresentationInteractionsFormData({
					id: "interaction-1",
					interaction_ui_template: finalistUi,
					config: finalistVoteConfig(),
				}) }
			/>,
		)

		expect(screen.getByText(/Interaction type is fixed after creation/i)).toBeTruthy()
		expect(screen.getByText("Default votes per member")).toBeTruthy()
		expect(screen.getByText("Number of finalists")).toBeTruthy()
		expect(screen.getByText("Answers and live results")).toBeTruthy()
		expect(screen.getAllByRole("option")).toHaveLength(1)
	})

	test("updating answer pipeline keeps presentation finalist count", async () => {
		const user = userEvent.setup()
		const finalistUi = createInteractionUiTemplate({ id: "ui-2", name: "Finalist vote", slug: "finalist_vote" })

		render(
			<PresentationInteractionForm
				to="/interactions/finalist-vote"
				method="patch"
				presentation_interaction={ createPresentationInteractionsFormData({
					id: "interaction-1",
					finalist_count: 5,
					interaction_ui_template: finalistUi,
					config: finalistVoteConfig(),
				}) }
			/>,
		)

		const hidden = document.querySelector("input[type=\"hidden\"][name=\"presentation.settings.finalist_count\"]")
		if(!(hidden instanceof HTMLInputElement)) {
			expect.unreachable()
			return
		}

		await waitFor(() => {
			expect(hidden.value).toBe("5")
		})

		await user.click(screen.getByRole("button", { name: "Add another answer" }))

		expect(hidden.value).toBe("5")
	})
})
