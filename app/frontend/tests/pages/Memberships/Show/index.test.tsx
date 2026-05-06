import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowMembership from "@/pages/Memberships/Show"
import { createCirclePersisted, createMembershipPersisted } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Memberships/Show/index", () => {
	registerActiveCircleLifecycle()

	test("renders membership show", () => {
		const persisted = createMembershipPersisted()
		const membership: Schema.MembershipsShow = {
			id: persisted.id,
			active: persisted.active,
			circle: createCirclePersisted(),
			funds: persisted.funds,
			name: persisted.name,
			slug: persisted.slug,
			number: persisted.number,
		}

		render(<ShowMembership membership={ membership } />)

		screen.getByRole("link", { name: persisted.name })
	})
})
