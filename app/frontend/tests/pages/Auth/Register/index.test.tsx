import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import Register from "@/pages/Auth/Register"
import { render } from "@/tests/helpers/utils"

describe("pages/Auth/Register/index", () => {
	test("renders registration form", () => {
		render(<Register />)

		screen.getByRole("button", { name: "Sign Up" })
	})
})
