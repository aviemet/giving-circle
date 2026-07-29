import React from "react"
import { describe, expect, test } from "vitest"

import { ThemesTable } from "@/domains/themes/Table"
import { createPagination, createThemesIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/themes/Table", () => {
	test("mounts with records", () => {
		render(
			<ThemesTable
				records={ [createThemesIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="themes"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
