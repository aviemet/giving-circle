import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowPresentation from "@/pages/Presentations/Show"
import { createPresentationPresentation } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Show/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders presentation show", () => {
		const presentation = createPresentationPresentation({ active: false })

		render(<ShowPresentation presentation={ presentation } />)

		screen.getByRole("link", { name: /Start Presentation/ })
	})
})
