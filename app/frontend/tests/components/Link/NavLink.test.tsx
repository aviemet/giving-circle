import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { NavLink } from "@/components/Link/NavLink"
import { render } from "@/tests/helpers/utils"

describe("NavLink", () => {
	test("renders a link with the given href", () => {
		render(<NavLink href="/test">Test</NavLink>)

		const link = screen.getByRole("link", { name: "Test" })
		expect(link).toHaveAttribute("href", "/test")
	})

	test("opens internal links in a new tab with target blank", () => {
		render(
			<NavLink href="/circle-1/p/presentation-1" target="_blank" rel="noreferrer" active={ false }>
				Presentation
			</NavLink>,
		)

		const link = screen.getByRole("link", { name: "Presentation" })
		expect(link).toHaveAttribute("href", "/circle-1/p/presentation-1")
		expect(link).toHaveAttribute("target", "_blank")
		expect(link).toHaveAttribute("rel", "noreferrer")
	})
})
