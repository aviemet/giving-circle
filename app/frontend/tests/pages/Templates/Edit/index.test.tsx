import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import EditTemplate from "@/pages/Templates/Edit"
import { createTemplatesEdit } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Templates/Edit", () => {
	registerActiveCircleLifecycle()

	test("renders template edit form", () => {
		render(
			<EditTemplate template={ createTemplatesEdit({ name: "Template 1" }) } />,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Update Template" })).toBeTruthy()
	})
})
