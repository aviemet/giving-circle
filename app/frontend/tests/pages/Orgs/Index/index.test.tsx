import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import OrgsIndex from "@/pages/Orgs/Index"
import { createOrgsIndex, createPagination } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Orgs/Index/index", () => {
	registerActiveCircleLifecycle()

	test("renders orgs index", () => {
		render(
			<OrgsIndex
				orgs={ [createOrgsIndex()] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByText("Organizations")
	})
})
