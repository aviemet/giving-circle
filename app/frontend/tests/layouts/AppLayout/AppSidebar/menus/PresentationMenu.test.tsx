import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { Accordion } from "@/components"
import { PresentationMenu } from "@/layouts/AppLayout/AppSidebar/menus/PresentationMenu"
import { Routes } from "@/lib"
import {
	createCircleInertiaShare,
	createPresentationInertiaShare,
	createThemeInertiaShare,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/menus/PresentationMenu", () => {
	test("returns null without presentation", () => {
		const { container } = render(
			<Accordion>
				<PresentationMenu
					circle={ createCircleInertiaShare() }
					theme={ createThemeInertiaShare() }
				/>
			</Accordion>,
		)
		expect(container.querySelector(".mantine-Accordion-item")).toBeNull()
	})

	test("renders presentation nav links", async () => {
		const user = userEvent.setup()
		const circle = createCircleInertiaShare()
		const theme = createThemeInertiaShare()
		const presentation = createPresentationInertiaShare()

		render(
			<Accordion multiple>
				<PresentationMenu circle={ circle } theme={ theme } presentation={ presentation } />
			</Accordion>,
		)

		await user.click(screen.getByRole("button", { name: presentation.name }))

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "Slides" })).toHaveAttribute(
				"href",
				Routes.themePresentationSlides(circle.slug, theme.slug, presentation.slug),
			)
			expect(screen.getByRole("link", { name: "Interactions" })).toHaveAttribute(
				"href",
				Routes.themePresentationInteractions(circle.slug, theme.slug, presentation.slug),
			)
			expect(screen.getByRole("link", { name: "Messages" })).toHaveAttribute(
				"href",
				Routes.themePresentationMessaging(circle.slug, theme.slug, presentation.slug),
			)
		})
	})
})
