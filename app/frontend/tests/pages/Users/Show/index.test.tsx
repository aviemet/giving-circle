import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ShowUser from "@/pages/Users/Show"
import { render } from "@/tests/helpers/utils"

describe("pages/Users/Show/index", () => {
	test("renders user show placeholder", () => {
		const user: Schema.User = {
			id: "user-1",
			active: true,
			email: "user@example.com",
		}

		render(<ShowUser user={ user } />)

		screen.getByText("User")
	})
})
