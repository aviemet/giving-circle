import { screen } from "@testing-library/react"
import { afterEach, describe, expect, test } from "vitest"

import { AppShell } from "@/components"
import { PresentationSidebar } from "@/layouts/PresentationLayout/PresentationSidebar"
import { Routes } from "@/lib"
import {
	createCircleInertiaShare,
	createPresentationInertiaShare,
	createThemeInertiaShare,
} from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/PresentationLayout/PresentationSidebar", () => {
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.active_theme = undefined
		inertiaPageProps.active_presentation = undefined
	})

	test("renders exit link to presentation overview", () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()
		inertiaPageProps.active_theme = createThemeInertiaShare()
		inertiaPageProps.active_presentation = createPresentationInertiaShare()

		render(
			<AppShell>
				<AppShell.Navbar>
					<PresentationSidebar />
				</AppShell.Navbar>
			</AppShell>,
		)

		const exitLink = screen.getByRole("link", { name: "Exit presentation controls" })
		expect(exitLink).toHaveAttribute(
			"href",
			Routes.themePresentation("circle-1", "theme-1", "presentation-1"),
		)
	})
})
