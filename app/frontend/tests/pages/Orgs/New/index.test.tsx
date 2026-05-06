import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewOrg from "@/pages/Orgs/New"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Orgs/New/index", () => {
	registerActiveCircleLifecycle()

	test("renders new org form", () => {
		const org: Schema.OrgsFormData = {
			name: "",
		}

		render(<NewOrg org={ org } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Org" })
	})
})
