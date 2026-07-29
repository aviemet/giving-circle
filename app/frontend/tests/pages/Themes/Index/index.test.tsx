import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ThemesIndex from "@/pages/Themes/Index"
import {
	createCircleInertiaShare,
	createPagination,
	createThemesIndex,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Themes/Index/index", () => {
	registerActiveCircleLifecycle()

	test("renders themes index", () => {
		render(
			<ThemesIndex
				themes={ [createThemesIndex()] }
				pagination={ createPagination({ count: 1 }) }
				circle={ createCircleInertiaShare() }
			/>,
		)

		screen.getByLabelText("Search")
	})
})
