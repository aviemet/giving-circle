import { screen } from "@testing-library/react"
import React from "react"
import { afterEach, beforeEach, describe, expect, test } from "vitest"

import { Routes } from "@/lib"
import EditPresentation from "@/pages/Presentations/Edit"
import { createPresentationsEdit } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Edit/index", () => {
	beforeEach(() => {
		inertiaPageProps.params = {
			circle_slug: "battery-powered",
			theme_slug: "a-time-of-gifts",
			presentation_slug: "allocation-night",
			slug: "allocation-night",
			id: "presentation-1",
		}
	})

	afterEach(() => {
		inertiaPageProps.params = {
			circle_slug: "circle-1",
			theme_slug: "theme-1",
			presentation_slug: "presentation-1",
			slug: "slug-1",
			id: "id-1",
		}
	})

	test("renders edit presentation form", () => {
		render(<EditPresentation presentation={ createPresentationsEdit() } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Presentation" })
	})

	test("submits to the presentation update route", () => {
		const presentation = createPresentationsEdit({ slug: "allocation-night" })

		render(<EditPresentation presentation={ presentation } />)

		const form = document.querySelector("form")
		expect(form).not.toBeNull()

		expect(form).toHaveAttribute(
			"action",
			Routes.themePresentation("battery-powered", "a-time-of-gifts", "allocation-night"),
		)
		expect(form).toHaveAttribute("method", "put")
		expect(form?.getAttribute("action")).not.toContain("/edit")
	})
})
