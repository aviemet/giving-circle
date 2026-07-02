import { screen } from "@testing-library/react"
import { describe, test } from "vitest"

import ShowPresentation from "@/pages/Presentations/Show"
import { createPresentationsShow } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Show/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders presentation overview actions", () => {
		const presentation = createPresentationsShow({ active: false })

		render(<ShowPresentation presentation={ presentation } />)

		screen.getByRole("button", { name: /Start Presentation/ })
		screen.getByRole("link", { name: "Slides" })
		screen.getByRole("link", { name: "Settings" })
	})
})
