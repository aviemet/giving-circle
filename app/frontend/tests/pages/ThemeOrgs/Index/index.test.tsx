import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ThemeOrgsIndex from "@/pages/ThemeOrgs/Index"
import {
	createCircleInertiaShare,
	createPagination,
	createThemeInertiaShare,
	createThemesOrgsShow,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/ThemeOrgs/Index/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders theme orgs index", () => {
		render(
			<ThemeOrgsIndex
				orgs={ [createThemesOrgsShow()] }
				pagination={ createPagination({ count: 1 }) }
				theme={ createThemeInertiaShare() }
				circle={ createCircleInertiaShare() }
			/>,
		)

		screen.getByRole("button", { name: "Add Orgs to Theme" })
	})
})
