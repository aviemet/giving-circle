import { screen } from "@testing-library/react"
import React from "react"
import { beforeEach, describe, test, vi } from "vitest"

import EditTemplateSlides from "@/pages/Templates/Slides/Edit"
import { createSlideData, createTemplatePersisted } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

vi.mock("@/queries", async () => {
	const actual = await vi.importActual<typeof import("@/queries")>("@/queries")
	return {
		...actual,
		useUpdateTemplateSlide: () => ({
			mutate: vi.fn(),
			mutateAsync: vi.fn().mockResolvedValue({}),
			isPending: false,
		}),
	}
})

async function waitForSaveButton() {
	return screen.findByRole("button", { name: "Save", hidden: true }, { timeout: 30000 })
}

describe("pages/Templates/Slides/Edit", () => {
	registerActiveCircleLifecycle()

	beforeEach(() => {
		window.localStorage.clear()
		document.elementsFromPoint ??= () => []
		inertiaPageProps.params = {
			...inertiaPageProps.params,
			circle_slug: "circle-1",
			template_slug: "template-1",
			slug: "slide-1",
		}
	})

	test("renders template slide visual editor", async () => {
		const template = {
			...createTemplatePersisted(),
			slides: [],
			settings: {},
		}

		const slide: Schema.SlidesFormData = {
			id: "slide-1",
			slug: "slide-1",
			data: createSlideData(),
			title: "Template Slide",
		}

		render(<EditTemplateSlides template={ template } slide={ slide } />)

		await waitForSaveButton()
	}, 35000)
})
