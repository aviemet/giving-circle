import { screen } from "@testing-library/react"
import React from "react"

import { AnchorLink } from "@/components/Link/AnchorLink"
import { render } from "@/tests/helpers/utils"

describe("AnchorLink", () => {
	it("renders a link with the given href", () => {
		render(<AnchorLink href="/test">Test</AnchorLink>)

		const link = screen.getByRole("link", { name: "Test" })
		expect(link).toHaveAttribute("href", "/test")
	})
})

