import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import NewCircle from "@/pages/Circles/New"
import { render } from "@/tests/helpers/utils"

describe("pages/Circles/New/index", () => {
	test("renders new circle form", () => {
		const circle: Schema.CirclesFormData = {
			name: "",
		}

		render(<NewCircle circle={ circle } />)

		screen.getByLabelText("Name")
		screen.getByRole("button", { name: "Create Circle" })
	})
})
