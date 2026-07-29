import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { MembershipForm } from "@/domains/memberships/Form"
import { render } from "@/tests/helpers/utils"

describe("domains/memberships/Form", () => {
	test("renders create membership form", () => {
		render(
			<MembershipForm
				to="/memberships"
				membership={ {
					active: true,
					funds: { amount: 0, cents: 0, currency_iso: "USD" },
					name: "",
				} }
			/>,
		)
		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Membership" })
	})

	test("renders update membership form", () => {
		render(
			<MembershipForm
				to="/memberships/1"
				method="put"
				membership={ {
					id: "membership-1",
					active: true,
					funds: { amount: 10, cents: 1000, currency_iso: "USD" },
					name: "Member 1",
					number: "1",
				} }
			/>,
		)
		screen.getByRole("button", { name: "Update Membership" })
	})
})
