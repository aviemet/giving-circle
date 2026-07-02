import { screen } from "@testing-library/react"
import { afterEach, describe, expect, test } from "vitest"

import { PresentationSidebarMenu } from "@/layouts/PresentationLayout/PresentationSidebar/Menu"
import {
	createCircleInertiaShare,
	createPresentationInertiaShare,
	createThemeInertiaShare,
} from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/PresentationLayout/PresentationSidebar/Menu", () => {
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.active_theme = undefined
		inertiaPageProps.active_presentation = undefined
	})

	test("renders audience presentation link in Links section", () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()
		inertiaPageProps.active_theme = createThemeInertiaShare()
		inertiaPageProps.active_presentation = createPresentationInertiaShare()

		render(<PresentationSidebarMenu />)

		screen.getByText("Links")

		const link = screen.getByRole("link", { name: "Presentation" })
		expect(link).toHaveAttribute("href", "/circle-1/p/presentation-1")
		expect(link).toHaveAttribute("target", "_blank")
		expect(link).toHaveAttribute("rel", "noreferrer")
	})
})
