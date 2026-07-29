import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import InteractionConfigTemplatesIndex from "@/pages/InteractionConfigTemplates/Index"
import {
	createCirclesOptions,
	createInteractionConfigTemplatesIndex,
	createPagination,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/InteractionConfigTemplates/Index", () => {
	registerActiveCircleLifecycle()

	test("renders interaction templates index", () => {
		render(
			<InteractionConfigTemplatesIndex
				interaction_config_templates={ [createInteractionConfigTemplatesIndex()] }
				pagination={ createPagination({ count: 1 }) }
				circle={ createCirclesOptions() }
			/>,
		)

		screen.getByLabelText("Search")
		screen.getByRole("button", { name: "Actions" })
	})
})
