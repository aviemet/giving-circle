import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { StartPresentationButton } from "@/domains/presentations/Buttons/StartPresentationButton"
import { render } from "@/tests/helpers/utils"

describe("domains/presentations/Buttons/StartPresentationButton", () => {
	test("renders start presentation button", () => {
		render(
			<StartPresentationButton
				presentation={ {
					id: "presentation-1",
					active: false,
					name: "Presentation 1",
					slug: "presentation-1",
					theme_id: "theme-1",
					settings: { finalist_count: 5 },
				} }
			/>,
		)
		screen.getByRole("button")
	})
})
