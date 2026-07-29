import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { PublicLayout } from "@/layouts/PublicLayout"
import { render } from "@/tests/helpers/utils"

describe("layouts/PublicLayout", () => {
	test("renders children in shell", () => {
		render(
			<PublicLayout>
				<span>public child</span>
			</PublicLayout>,
		)
		screen.getByText("public child")
		screen.getByText("Navigation")
	})
})
