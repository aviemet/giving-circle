import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ActivePresentationMembers from "@/pages/Presentations/Active/Members"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Members/index", () => {
	test("renders members", () => {
		render(<ActivePresentationMembers />)

		screen.getByText("Members")
	})
})
