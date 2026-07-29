import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditUser from "@/pages/Users/Edit"
import { render } from "@/tests/helpers/utils"

describe("pages/Users/Edit/index", () => {
	test("renders edit user placeholder", () => {
		render(<EditUser />)

		screen.getByText("Edit")
	})
})
