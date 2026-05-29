import { screen } from "@testing-library/react"
import React from "react"
import { afterEach, beforeEach, describe, test } from "vitest"

import NewPresentation from "@/pages/Presentations/New"
import { createCircleInertiaShare, createThemeInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/New/index", () => {
	beforeEach(() => {
		inertiaPageProps.active_circle = createCircleInertiaShare()
		inertiaPageProps.active_theme = createThemeInertiaShare()
	})

	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.active_theme = undefined
	})

	test("renders the new presentation form", () => {
		const presentation: Schema.PresentationsFormData = {
			active: true,
			name: "",
			slides: [],
			template_id: "",
			theme_id: "theme-1",
		}

		render(<NewPresentation presentation={ presentation } templates={ [] } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Presentation" })
	})
})
