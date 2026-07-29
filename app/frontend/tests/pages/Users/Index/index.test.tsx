import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import UsersIndex from "@/pages/Users/Index"
import { createPagination, createUsersIndex } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Users/Index/index", () => {
	registerActiveCircleLifecycle()

	test("renders users index", () => {
		render(
			<UsersIndex
				users={ [createUsersIndex()] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByLabelText("Search")
	})
})
