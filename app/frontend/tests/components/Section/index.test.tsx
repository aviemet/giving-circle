import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { Section } from "@/components/Section"
import { render } from "@/tests/helpers/utils"

describe("components/Section", () => {
	test("renders section children", () => {
		render(<Section>Section body</Section>)
		screen.getByText("Section body")
	})
})
