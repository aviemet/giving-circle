import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { NewTemplateForm } from "@/domains/templates/NewTemplateModal/NewTemplateForm"
import { render } from "@/tests/helpers/utils"

describe("domains/templates/NewTemplateModal/NewTemplateForm", () => {
	test("renders name field and get started submit", () => {
		render(
			<Form
				action="/settings/circle-1/templates"
				method="post"
				initialData={ { template: { name: "" } } }
			>
				<NewTemplateForm />
			</Form>,
		)

		expect(screen.getByLabelText("Name")).toBeTruthy()
		expect(screen.getByRole("button", { name: /let's get started/i })).toBeTruthy()
	})
})
