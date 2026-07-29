import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ThemeOrgsImport from "@/pages/ThemeOrgs/Import"
import { createCircleInertiaShare, createThemeInertiaShare } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/ThemeOrgs/Import/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders import dropzone", () => {
		render(
			<ThemeOrgsImport
				circle={ createCircleInertiaShare() }
				theme={ createThemeInertiaShare() }
			/>,
		)

		screen.getByText(/Import a/)
	})
})
