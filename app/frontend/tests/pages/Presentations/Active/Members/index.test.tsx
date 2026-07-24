import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import ActivePresentationMembers from "@/pages/Presentations/Active/Members"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Members/index", () => {
	test("renders members page", () => {
		inertiaPageProps.params = {
			circle_slug: "circle-1",
			theme_slug: "theme-1",
			presentation_slug: "presentation-1",
		}

		render(
			<ActivePresentationMembers
				presentation={ {
					id: "presentation-1",
					active: true,
					name: "Presentation 1",
					slug: "presentation-1",
					theme_id: "theme-1",
				} }
				members={ [] }
			/>,
		)

		expect(screen.getByTestId("inertia-head")).toHaveAttribute("data-title", "Members")
	})
})
