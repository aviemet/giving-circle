import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { afterEach, beforeEach, describe, expect, test } from "vitest"

import { Accordion } from "@/components"
import {
	TemplatesSettingsMenu,
} from "@/layouts/AppLayout/AppSidebar/menus/TemplatesSettingsMenu"
import { Routes } from "@/lib"
import { createCircleInertiaShare } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/menus/TemplatesSettingsMenu", () => {
	const originalPathname = window.location.pathname

	beforeEach(() => {
		window.history.pushState({}, "", "/settings/circle-1/templates")
	})

	afterEach(() => {
		window.history.pushState({}, "", originalPathname)
	})

	test("renders presentation and interaction template links", async () => {
		const user = userEvent.setup()
		const circle = createCircleInertiaShare()

		render(
			<Accordion multiple>
				<TemplatesSettingsMenu circle={ circle } />
			</Accordion>,
		)

		await user.click(screen.getByRole("button", { name: "Templates" }))

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "Presentation Templates" })).toHaveAttribute(
				"href",
				Routes.settingsTemplates(circle.slug),
			)
			expect(screen.getByRole("link", { name: "Interaction Templates" })).toHaveAttribute(
				"href",
				Routes.settingsInteractionTemplates(circle.slug),
			)
			expect(screen.getByRole("link", { name: "Message Templates" })).toHaveAttribute(
				"href",
				Routes.settingsMessageTemplates(circle.slug),
			)
		})
	})
})
