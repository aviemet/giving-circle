import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import EditCircle from "@/pages/Circles/Edit"
import { createCirclePersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Circles/Edit/index", () => {
	test("renders edit circle form", () => {
		const persisted = createCirclePersisted()
		const circle: Schema.CirclesEdit = {
			id: persisted.id,
			name: persisted.name,
			slug: persisted.slug,
		}

		render(<EditCircle circle={ circle } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Update Circle" })
	})
})
