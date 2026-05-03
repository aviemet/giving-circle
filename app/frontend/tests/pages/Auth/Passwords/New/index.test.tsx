import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import PasswordsNew from "@/pages/Auth/Passwords/New"
import { render } from "@/tests/helpers/utils"

describe("pages/Auth/Passwords/New/index", () => {
	test("renders password reset form", () => {
		render(<PasswordsNew />)

		screen.getByText("Reset Password")
		screen.getByRole("button", { name: "Send Reset Instructions" })
	})
})
