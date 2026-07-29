import React from "react"
import { describe, expect, test } from "vitest"

import { CircleTable } from "@/domains/circles/Table"
import { createPagination, createThemePersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/circles/Table", () => {
	test("mounts with records", () => {
		const record: Schema.CirclesIndex = {
			id: "circle-1",
			name: "Circle 1",
			slug: "circle-1",
			themes: [createThemePersisted()],
			themes_count: 1,
			memberships_count: 2,
		}
		render(
			<CircleTable
				records={ [record] }
				pagination={ createPagination({ count: 1 }) }
				model="circles"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
