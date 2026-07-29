import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { Label } from "@/components/Label"
import { render } from "@/tests/helpers/utils"

describe("components/Label", () => {
	test("renders label children", () => {
		render(<Label>Field label</Label>)
		screen.getByText("Field label")
	})
})
