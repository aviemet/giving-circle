import { describe, expect, test } from "vitest"

import { DataTable, Table } from "@/components/Table"

describe("components/Table exports", () => {
	test("Table composite exposes DataTable", () => {
		expect(Table.DataTable).toBe(DataTable)
	})
})
