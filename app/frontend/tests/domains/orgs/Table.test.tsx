import React from "react"
import { describe, expect, test } from "vitest"

import { OrgTable } from "@/domains/orgs/Table"
import { createOrgsIndex, createPagination } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/orgs/Table", () => {
	test("mounts with records", () => {
		render(
			<OrgTable
				records={ [createOrgsIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="orgs"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
