import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { SmtpForm } from "@/domains/settings/mail/Form"
import { createSmtpsFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/settings/mail/Form", () => {
	test("renders smtp form", () => {
		render(
			<SmtpForm
				to="/settings/mail"
				smtp={ createSmtpsFormData({
					username: "mailer",
					password: "secret",
					domain: "example.com",
				}) }
			/>,
		)
		screen.getByLabelText("Name")
		screen.getByRole("button", { name: /Save|save/i })
	})
})
