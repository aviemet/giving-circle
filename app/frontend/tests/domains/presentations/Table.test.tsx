import React from "react"
import { describe, expect, test } from "vitest"

import { PresentationTable } from "@/domains/presentations/Table"
import { createPagination, createPresentationsIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentations/Table", () => {
	test("mounts with records", () => {
		render(
			<PresentationTable
				records={ [createPresentationsIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="presentations"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
