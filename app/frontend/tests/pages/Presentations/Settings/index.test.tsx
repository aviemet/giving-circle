import { screen } from "@testing-library/react"
import { describe, test } from "vitest"

import SettingsPresentation from "@/pages/Presentations/Settings"
import { createPresentationsFormData, createPresentationInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Settings/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders settings form", () => {
		inertiaPageProps.active_presentation = createPresentationInertiaShare()

		render(<SettingsPresentation presentation={ createPresentationsFormData() } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Presentation" })
	})
})
