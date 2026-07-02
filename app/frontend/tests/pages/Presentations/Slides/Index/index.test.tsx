import { screen } from "@testing-library/react"
import { describe, test } from "vitest"

import { AppHeader } from "@/layouts/AppLayout/AppHeader"
import PresentationSlidesIndex from "@/pages/Presentations/Slides/Index"
import { createPresentationsShow, createPresentationInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Slides/Index/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders slide deck", () => {
		inertiaPageProps.active_presentation = createPresentationInertiaShare()

		const presentation = createPresentationsShow({
			slides: [{
				id: "slide-1",
				slug: "intro",
				title: "Intro",
				data: { content: [], root: { props: {} } },
			}],
		})

		render(
			<>
				<PresentationSlidesIndex presentation={ presentation } />
				<AppHeader />
			</>,
		)

		screen.getByText("Intro")
		screen.getByRole("link", { name: "Intro" })
		screen.getByRole("button", { name: "Add slide" })
	})
})
