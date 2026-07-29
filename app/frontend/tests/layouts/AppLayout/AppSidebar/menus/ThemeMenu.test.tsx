import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { Accordion } from "@/components"
import { ThemeMenu } from "@/layouts/AppLayout/AppSidebar/menus/ThemeMenu"
import { Routes } from "@/lib"
import { createCircleInertiaShare, createThemeInertiaShare } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/menus/ThemeMenu", () => {
	test("returns null without theme", () => {
		const { container } = render(
			<Accordion>
				<ThemeMenu circle={ createCircleInertiaShare() } />
			</Accordion>,
		)
		expect(container.querySelector(".mantine-Accordion-item")).toBeNull()
	})

	test("renders theme nav links", async () => {
		const user = userEvent.setup()
		const circle = createCircleInertiaShare()
		const theme = createThemeInertiaShare()

		render(
			<Accordion multiple>
				<ThemeMenu circle={ circle } theme={ theme } />
			</Accordion>,
		)

		await user.click(screen.getByRole("button", { name: theme.name }))

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
				"href",
				Routes.theme(circle.slug, theme.slug),
			)
			expect(screen.getByRole("link", { name: "Organizations" })).toHaveAttribute(
				"href",
				Routes.themeOrgs(circle.slug, theme.slug),
			)
		})
	})
})
