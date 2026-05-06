import { screen } from "@testing-library/react"
import React from "react"

import { NavLink } from "@/components/Link/NavLink"
import { render } from "@/tests/helpers/utils"

describe("NavLink", () => {
	it("renders a link with the given href", () => {
		render(<NavLink href="/test">Test</NavLink>)

		const link = screen.getByRole("link", { name: "Test" })
		expect(link).toHaveAttribute("href", "/test")
	})
})

