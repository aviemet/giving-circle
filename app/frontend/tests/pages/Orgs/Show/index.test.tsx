import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowOrg from "@/pages/Orgs/Show"
import { createCirclePersisted, createOrgPersisted } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Orgs/Show/index", () => {
	registerActiveCircleLifecycle()

	test("renders org show", () => {
		const persisted = createOrgPersisted()
		const org: Schema.OrgsShow = {
			id: persisted.id,
			circle: createCirclePersisted(),
			name: persisted.name,
			slug: persisted.slug,
		}

		render(<ShowOrg org={ org } />)

		screen.getByRole("link", { name: persisted.name })
	})
})
