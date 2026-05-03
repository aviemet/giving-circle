import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ConfirmationsNew from "@/pages/Auth/Confirmations/New"
import { render } from "@/tests/helpers/utils"

describe("pages/Auth/Confirmations/New/index", () => {
	test("renders confirmation resend form", () => {
		const user: Schema.User = {
			active: true,
			email: "user@example.com",
		}

		render(<ConfirmationsNew user={ user } />)

		screen.getByText("Please check your email")
		screen.getByRole("button", { name: "Resend confirmation instructions" })
	})
})
