import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { InteractionConfigTemplateForm } from "@/domains/interactionConfigTemplates/Form"
import { createInteractionConfigTemplatesFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/interactionConfigTemplates/Form", () => {
	test("renders intro, name, member screen, and create submit", () => {
		render(
			<InteractionConfigTemplateForm
				to="/settings/circle-1/interaction_templates"
				interaction_config_template={ createInteractionConfigTemplatesFormData() }
			/>,
		)

		expect(screen.getByText(/defines the member form/i)).toBeTruthy()
		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByText("Member screen")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Create Template" })).toBeTruthy()
	})

	test("shows update submit when template already has an id", () => {
		render(
			<InteractionConfigTemplateForm
				to="/settings/circle-1/interaction_templates/allocation-template"
				method="put"
				interaction_config_template={ createInteractionConfigTemplatesFormData({
					id: "ict-1",
				}) }
			/>,
		)

		expect(screen.getByRole("button", { name: "Update Template" })).toBeTruthy()
	})
})
