import React from "react"
import { describe, expect, test } from "vitest"

import { PresentationElementsTable } from "@/domains/presentation/elements/Table"
import { createPagination } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentation/elements/Table", () => {
	test("mounts with records", () => {
		const record: Schema.PresentationElementsIndex = {
			id: "element-1",
			data: { key: "value" },
			name: "Element 1",
			slug: "element-1",
			template: false,
		}
		render(
			<PresentationElementsTable
				records={ [record] }
				pagination={ createPagination({ count: 1 }) }
				model="presentation_elements"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
