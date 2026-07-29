import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { PresentationInteractionForm } from "@/domains/presentation/interactions/Form"
import { createPresentationInteractionsFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentation/interactions/Form/PresentationInteractionForm", () => {
	test("renders name, trigger, template, and create submit", () => {
		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createPresentationInteractionsFormData() }
			/>,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByText("Trigger type")).toBeTruthy()
		expect(screen.getByText("Template")).toBeTruthy()
		expect(screen.getByText("Member screen")).toBeTruthy()
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

	test("selecting finalist vote screen shows finalist settings", async () => {
		const user = userEvent.setup()

		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createPresentationInteractionsFormData() }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Finalist vote/i }))

		expect(screen.getByText("Number of finalists")).toBeTruthy()
		expect(screen.getByText("Default votes per member")).toBeTruthy()
	})

	test("selecting pledges screen shows pledge settings", async () => {
		const user = userEvent.setup()

		render(
			<PresentationInteractionForm
				to="/interactions"
				presentation_interaction={ createPresentationInteractionsFormData() }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Pledges/i }))

		expect(screen.getByText("Allow pledges to non-finalists")).toBeTruthy()
		expect(screen.getByText("Allow pledges over organization ask")).toBeTruthy()
	})
})
