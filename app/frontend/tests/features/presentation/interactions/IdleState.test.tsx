import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { IdleState } from "@/features/presentation/interactions/IdleState"
import { render } from "@/tests/helpers/utils"

describe("features/presentation/interactions/IdleState", () => {
	test("renders idle copy", () => {
		render(<IdleState />)
		screen.getByRole("heading", { level: 2 })
	})
})
