import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import CirclesIndex from "@/pages/Circles/Index"
import { createCircleShow, createPagination } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Circles/Index/index", () => {
	test("renders circles dashboard", () => {
		render(
			<CirclesIndex
				circles={ [createCircleShow()] }
				pagination={ createPagination({ count: 1 }) }
			/>,
		)

		screen.getByText("Your Circles")
		expect(screen.getAllByText("Circle 1").length).toBeGreaterThan(0)
	})
})
