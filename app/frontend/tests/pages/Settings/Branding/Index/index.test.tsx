import { screen } from "@testing-library/react"
import { afterEach, describe, test } from "vitest"

import BrandingSettings from "@/pages/Settings/Branding/Index"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Branding/Index", () => {
	afterEach(() => {
		inertiaPageProps.params = {
			circle_slug: "circle-1",
			theme_slug: "theme-1",
			presentation_slug: "presentation-1",
			slug: "slug-1",
			id: "id-1",
		}
	})

	test("renders primary color form", () => {
		inertiaPageProps.params.circle_slug = "battery-powered"

		render(<BrandingSettings settings={ { primary_color: "grape" } } />)

		screen.getByText("Circle Color")
		screen.getByRole("button", { name: "Save Branding Settings" })
	})
})
