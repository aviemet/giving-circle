import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PresentationsIndex from "@/pages/Presentations/Index"
import {
	createCircleInertiaShare,
	createPresentationsIndex,
	createPagination,
	createThemeInertiaShare,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Index/index", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders presentations index", () => {
		const circle = createCircleInertiaShare()
		const theme = createThemeInertiaShare()

		render(
			<PresentationsIndex
				presentations={ [createPresentationsIndex()] }
				pagination={ createPagination({ count: 1 }) }
				circle={ circle }
				theme={ theme }
			/>,
		)

		screen.getByText("Presentations")
	})
})
