import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { TemplatesTable } from "@/domains/templates/Table"
import {
	createCirclesOptions,
	createPagination,
	createTemplatesIndex,
	createThemesIndex,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/templates/Table", () => {
	test("mounts with records", () => {
		render(
			<TemplatesTable
				circle={ createCirclesOptions() }
				themes={ [createThemesIndex()] }
				records={ [createTemplatesIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="templates"
			/>,
		)

		expect(document.body).toBeTruthy()
	})

	test("shows empty state copy when circle has no templates", () => {
		render(
			<TemplatesTable
				circle={ createCirclesOptions({ name: "Circle 1" }) }
				themes={ [] }
				records={ [] }
				pagination={ createPagination() }
				model="templates"
			/>,
		)

		expect(screen.getByText(/doesn't have any saved presentation templates/i)).toBeTruthy()
	})
})
