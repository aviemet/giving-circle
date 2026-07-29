import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { AuthLayout } from "@/layouts/AuthLayout"
import { render } from "@/tests/helpers/utils"

describe("layouts/AuthLayout", () => {
	test("renders children", () => {
		render(
			<AuthLayout>
				<span>auth child</span>
			</AuthLayout>,
		)
		screen.getByText("auth child")
	})
})
