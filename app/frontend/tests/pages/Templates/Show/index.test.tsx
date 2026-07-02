import { screen } from "@testing-library/react"
import { describe, test } from "vitest"

import { AppHeader } from "@/layouts/AppLayout/AppHeader"
import ShowTemplate from "@/pages/Templates/Show"
import { createCircleInertiaShare, createSlidesIndex, createTemplatesShow } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("pages/Templates/Show/index", () => {
	test("renders template slide cards", () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()

		const template = createTemplatesShow({
			slides: [createSlidesIndex({ title: "Intro", slug: "intro" })],
		})

		render(
			<>
				<ShowTemplate template={ template } />
				<AppHeader />
			</>,
		)

		screen.getByText("Intro")
		screen.getByRole("link", { name: "Intro" })
		screen.getByRole("button", { name: "Add slide" })
	})
})
