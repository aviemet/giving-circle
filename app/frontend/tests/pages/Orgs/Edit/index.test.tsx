import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditOrg from "@/pages/Orgs/Edit"
import { createOrgPersisted } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Orgs/Edit/index", () => {
	registerActiveCircleLifecycle()

	test("renders edit org form", () => {
		const persisted = createOrgPersisted()
		const org: Schema.OrgsEdit = {
			id: persisted.id,
			name: persisted.name,
			slug: persisted.slug,
		}

		render(<EditOrg org={ org } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Org" })
	})
})
