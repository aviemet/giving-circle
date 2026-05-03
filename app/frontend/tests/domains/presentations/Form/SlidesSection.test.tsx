import { screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { SlidesSection } from "@/domains/presentations/Form/SlidesSection"
import { createCircleInertiaShare, createSlideData, createThemeInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

registerActiveCircleAndThemeLifecycle()

describe("domains/presentations/Form/SlidesSection", () => {
	test("slide card edit link uses FriendlyId slug not array index", () => {
		inertiaPageProps.active_circle = createCircleInertiaShare({ slug: "battery-powered", themes: [] })
		inertiaPageProps.active_theme = createThemeInertiaShare({ slug: "the-yellow-meads-of-asphodel" })

		const presentation: Schema.PresentationsEdit = {
			id: "p1",
			active: true,
			name: "Allocation Night",
			slug: "allocation-night",
			theme_id: "t1",
			slides: [
				{ id: "s1", slug: "opening-night", data: createSlideData(), title: "Opening" },
			],
		}

		render(
			<Form action="/test" method="put" initialData={ { presentation } }>
				<SlidesSection
					circle={ createCircleInertiaShare({ slug: "battery-powered", themes: [] }) }
					presentation={ presentation }
				/>
			</Form>,
		)

		const link = screen.getByRole("link")
		const href = link.getAttribute("href") ?? ""

		expect(href).toContain("/slides/opening-night/edit")
		expect(href).not.toContain("/slides/0/edit")
	})
})
