import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { Form } from "@/components/Form"
import { SlidesSection } from "@/domains/presentations/Form/SlidesSection"
import {
	createCircleInertiaShare,
	createPresentationsEdit,
	createThemeInertiaShare,
} from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("domains/presentations/Form/SlidesSection", () => {
	test("returns empty without active theme", () => {
		inertiaPageProps.active_theme = undefined
		render(
			<Form action="/p" method="put" initialData={ { presentation: createPresentationsEdit() } }>
				<div data-testid="host">
					<SlidesSection
						circle={ createCircleInertiaShare() }
						presentation={ createPresentationsEdit() }
					/>
				</div>
			</Form>,
		)
		screen.getByTestId("host")
	})

	test("renders slides section with active theme", () => {
		inertiaPageProps.active_theme = createThemeInertiaShare()
		render(
			<Form action="/p" method="put" initialData={ { presentation: createPresentationsEdit() } }>
				<SlidesSection
					circle={ createCircleInertiaShare() }
					presentation={ createPresentationsEdit({ slides: [] }) }
				/>
			</Form>,
		)
		screen.getByText("Slides")
		inertiaPageProps.active_theme = undefined
	})
})
