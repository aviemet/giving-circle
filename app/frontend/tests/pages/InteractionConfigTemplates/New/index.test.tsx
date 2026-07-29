import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import NewInteractionConfigTemplate from "@/pages/InteractionConfigTemplates/New"
import { createInteractionConfigTemplatesFormData } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/InteractionConfigTemplates/New", () => {
	registerActiveCircleLifecycle()

	test("renders new interaction template form", () => {
		render(
			<NewInteractionConfigTemplate
				interaction_config_template={ createInteractionConfigTemplatesFormData() }
			/>,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Create Template" })).toBeTruthy()
	})
})
