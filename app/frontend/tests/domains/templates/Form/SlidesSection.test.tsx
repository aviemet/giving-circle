import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { Form } from "@/components/Form"
import { SlidesSection } from "@/domains/templates/Form/SlidesSection"
import { createCirclePersisted, createTemplatesEdit } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

vi.mock("@/queries", async () => {
	const actual = await vi.importActual<typeof import("@/queries")>("@/queries")
	return {
		...actual,
		useCreateTemplateSlide: () => ({
			mutate: vi.fn(),
			isPending: false,
		}),
	}
})

describe("domains/templates/Form/SlidesSection", () => {
	test("renders slides heading and opens add-slide confirm", async () => {
		const user = userEvent.setup()
		const circle = createCirclePersisted()
		const template = createTemplatesEdit({
			slides: [{
				id: "slide-1",
				slug: "slide-1",
				data: { content: [], root: { props: { title: "Slide" } } },
				title: "Slide 1",
			}],
		})

		render(
			<Form
				action="/templates"
				method="put"
				initialData={ { template } }
			>
				<SlidesSection circle={ circle } template={ template } />
			</Form>,
		)

		expect(screen.getByRole("heading", { name: "Slides" })).toBeTruthy()
		await user.click(screen.getByRole("button", { name: "+" }))
		await waitFor(() => {
			expect(screen.getByText("Add a slide to this template")).toBeTruthy()
		})
	})
})
