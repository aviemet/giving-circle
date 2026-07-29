import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { UnformattedLayout } from "@/layouts/UnformattedLayout"
import { render } from "@/tests/helpers/utils"

describe("layouts/UnformattedLayout", () => {
	test("renders children", () => {
		render(
			<UnformattedLayout>
				<span>plain child</span>
			</UnformattedLayout>,
		)
		screen.getByText("plain child")
	})
})
