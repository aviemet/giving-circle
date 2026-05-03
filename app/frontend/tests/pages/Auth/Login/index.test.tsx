import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import Login from "@/pages/Auth/Login"
import { render } from "@/tests/helpers/utils"

describe("pages/Auth/Login/index", () => {
	test("renders login form", () => {
		render(<Login />)

		screen.getByText("Giving Circle")
		screen.getByRole("button", { name: "Log In" })
	})
})
