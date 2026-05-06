import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditMember from "@/pages/Memberships/Edit"
import { createMembershipPersisted } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Memberships/Edit/index", () => {
	registerActiveCircleLifecycle()

	test("renders edit membership form", () => {
		const persisted = createMembershipPersisted()
		const membership: Schema.MembershipsEdit = {
			id: persisted.id,
			active: persisted.active,
			funds: persisted.funds,
			name: persisted.name,
			slug: persisted.slug,
			number: persisted.number,
		}

		render(<EditMember membership={ membership } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Membership" })
	})
})
