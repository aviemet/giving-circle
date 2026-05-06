import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import MembershipsIndex from "@/pages/Memberships/Index"
import { createMembershipsIndex, createPagination } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Memberships/Index/index", () => {
	registerActiveCircleLifecycle()

	test("renders membership index", () => {
		render(
			<MembershipsIndex
				memberships={ [createMembershipsIndex()] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByText("Total Funds")
		screen.getByPlaceholderText("Search Members")
	})
})
