import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { MembershipForm } from "@/domains/memberships/Form"
import { SmtpForm } from "@/domains/settings/mail/Form"
import { createSmtpsFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/memberships and settings forms", () => {
	test("renders MembershipForm", () => {
		render(
			<MembershipForm
				to="/memberships"
				membership={ {
					active: true,
					funds: { amount: 10, cents: 1000, currency_iso: "USD" },
					name: "Member 1",
					number: "1",
				} }
			/>,
		)
		screen.getByRole("button")
	})

	test("renders SmtpForm", () => {
		render(
			<SmtpForm to="/settings/mail" smtp={ createSmtpsFormData() } />,
		)
		expect(screen.getAllByRole("button").length).toBeGreaterThan(0)
	})
})
