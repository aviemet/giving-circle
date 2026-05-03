import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewMembership from "@/pages/Memberships/New"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Memberships/New/index", () => {
	registerActiveCircleLifecycle()

	test("renders new membership form", () => {
		const membership: Schema.MembershipsFormData = {
			active: true,
			funds: { amount: 0, cents: 0, currency_iso: "USD" },
			name: "",
		}

		render(<NewMembership membership={ membership } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Membership" })
	})
})
