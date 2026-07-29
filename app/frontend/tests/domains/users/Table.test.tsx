import React from "react"
import { describe, expect, test } from "vitest"

import { UsersTable } from "@/domains/users/Table"
import { createPagination, createUsersIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/users/Table", () => {
	test("mounts with records", () => {
		render(
			<UsersTable
				records={ [createUsersIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="users"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
