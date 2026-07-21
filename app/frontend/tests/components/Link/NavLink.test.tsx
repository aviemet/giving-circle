import { router } from "@inertiajs/react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

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
			<NavLink href="/circle-1/p/presentation-1" target="_blank" active={ false }>
				Presentation
			</NavLink>,
		)

		const link = screen.getByRole("link", { name: "Presentation" })
		expect(link).toHaveAttribute("href", "/circle-1/p/presentation-1")
		expect(link).toHaveAttribute("target", "_blank")
	})

	test("does not navigate via Inertia when target is blank", async () => {
		const user = userEvent.setup()
		const visit = vi.mocked(router.visit)

		render(
			<NavLink href="/circle-1/p/presentation-1" target="_blank" active={ false }>
				Presentation
			</NavLink>,
		)

		await user.click(screen.getByRole("link", { name: "Presentation" }))

		expect(visit).not.toHaveBeenCalled()
	})
})
