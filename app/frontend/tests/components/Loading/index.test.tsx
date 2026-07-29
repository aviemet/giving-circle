import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { Loading } from "@/components/Loading"
import { render } from "@/tests/helpers/utils"

describe("components/Loading", () => {
	test("renders spinner and optional text", () => {
		render(<Loading text="Loading..." />)
		screen.getByText("Loading...")
	})
})
