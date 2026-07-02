import { screen } from "@testing-library/react"
import { describe, test } from "vitest"

import ShowTheme from "@/pages/Themes/Show"
import { createThemesShow } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Themes/Show/index", () => {
	registerActiveCircleLifecycle()

	test("renders theme dashboard sections", () => {
		const theme = createThemesShow({
			orgs_count: 2,
			presentations_count: 1,
			presentations: [{
				id: "presentation-1",
				name: "Allocation Night",
				slug: "allocation-night",
				active: false,
				slides_count: 3,
				theme_id: "theme-1",
			}],
		})

		render(<ShowTheme theme={ theme } />)

		screen.getByRole("heading", { name: "Organizations" })
		screen.getByRole("heading", { name: "Presentations" })
		screen.getByText("Allocation Night")
		screen.getByRole("link", { name: "New Presentation" })
	})
})
