import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import IntegrationsIndex from "@/pages/Settings/Integrations/Index"
import {
	createCirclesOptions,
	createIntegrationsIndex,
	createPagination,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Integrations/Index", () => {
	registerActiveCircleLifecycle()

	test("renders integrations index", () => {
		render(
			<IntegrationsIndex
				integrations={ [createIntegrationsIndex()] }
				pagination={ createPagination({ count: 1 }) }
				circle={ createCirclesOptions() }
			/>,
		)

		screen.getByLabelText("Search")
		screen.getByRole("button", { name: "Actions" })
	})
})
