import React from "react"
import { describe, expect, test } from "vitest"

import { MembershipTable } from "@/domains/memberships/Table"
import {
	createCircleInertiaShare,
	createMembershipsIndex,
	createPagination,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/memberships/Table", () => {
	test("mounts with records", () => {
		render(
			<MembershipTable
				circle={ createCircleInertiaShare() }
				records={ [createMembershipsIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="memberships"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
