import { fireEvent, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { beforeEach, describe, expect, test } from "vitest"

import EditPresentationSlides from "@/pages/Presentations/Slides/Edit"
import { createPresentationInertiaShare, createSlideData } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

async function waitForSaveButton() {
	return screen.findByRole("button", { name: "Save", hidden: true }, { timeout: 30000 })
}

function firstFieldsContainer() {
	const containers = screen.getAllByTestId("puck-fields-container")
	const container = containers[0]
	if(container === undefined) {
		throw new Error("Expected a fields container")
	}
	return container
}

describe("pages/Presentations/Slides/Edit/index", () => {
	registerActiveCircleAndThemeLifecycle()

	beforeEach(() => {
		window.localStorage.clear()
		document.elementsFromPoint ??= () => []
		inertiaPageProps.active_presentation = createPresentationInertiaShare()
	})

	test("renders slide visual editor", async () => {
		const presentation: Schema.PresentationsFormData = {
			active: true,
			name: "Presentation",
			slides: [],
			template_id: "",
			theme_id: "theme-1",
		}

		const slide: Schema.SlidesFormData = {
			id: "slide-1",
			slug: "slide-1",
			data: createSlideData(),
			title: "My Slide",
		}

		render(<EditPresentationSlides presentation={ presentation } slide={ slide } />)

		await waitForSaveButton()
	}, 35000)

	test("keeps focus on title input while editing", async () => {
		const presentation: Schema.PresentationsFormData = {
			active: true,
			name: "Presentation",
			slides: [],
			template_id: "",
			theme_id: "theme-1",
		}

		const slide: Schema.SlidesFormData = {
			id: "slide-1",
			slug: "slide-1",
			data: createSlideData(),
			title: "My Slide",
		}

		render(<EditPresentationSlides presentation={ presentation } slide={ slide } />)

		await waitForSaveButton()

		const user = userEvent.setup()

		await user.click(screen.getByRole("button", { name: "Toggle right sidebar", hidden: true }))

		const fieldsContainer = await waitFor(() => firstFieldsContainer())
		fieldsContainer.scrollTop = 100
		fireEvent.scroll(fieldsContainer)

		const titleInput = await waitFor(() => {
			const input = screen.getAllByDisplayValue("My Slide")[0]
			if(!(input instanceof HTMLInputElement) && !(input instanceof HTMLTextAreaElement)) {
				throw new Error("Expected a text input")
			}
			return input
		})

		await user.click(titleInput)
		await user.type(titleInput, "a")

		expect(fieldsContainer.scrollTop).toBe(100)
	}, 35000)
})
