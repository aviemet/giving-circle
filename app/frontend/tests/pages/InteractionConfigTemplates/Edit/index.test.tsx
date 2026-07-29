import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import EditInteractionConfigTemplate from "@/pages/InteractionConfigTemplates/Edit"
import { createInteractionConfigTemplatesEdit } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/InteractionConfigTemplates/Edit", () => {
	registerActiveCircleLifecycle()

	test("renders edit interaction template form", () => {
		render(
			<EditInteractionConfigTemplate
				interaction_config_template={ createInteractionConfigTemplatesEdit({
					name: "Allocation template",
				}) }
			/>,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Update Template" })).toBeTruthy()
	})
})
