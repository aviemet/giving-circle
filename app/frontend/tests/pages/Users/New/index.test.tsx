import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewUser from "@/pages/Users/New"
import { render } from "@/tests/helpers/utils"

describe("pages/Users/New/index", () => {
	test("renders new user placeholder", () => {
		render(<NewUser />)

		screen.getByText("New User")
	})
})
