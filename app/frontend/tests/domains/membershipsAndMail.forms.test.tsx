import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { MembershipForm } from "@/domains/memberships/Form"
import { IntegrationForm } from "@/domains/settings/integrations/Form"
import { createIntegrationsFormData } from "@/tests/helpers/fixtures"
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

	test("renders IntegrationForm", () => {
		render(
			<IntegrationForm to="/settings/integrations" integration={ createIntegrationsFormData() } />,
		)
		expect(screen.getAllByRole("button").length).toBeGreaterThan(0)
	})
})
