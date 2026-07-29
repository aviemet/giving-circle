import { describe, expect, test, vi } from "vitest"

import { parseCsvFile } from "@/lib/papaParse"

describe("lib/papaParse", () => {
	test("parses csv with inferred headings", async () => {
		const file = new File(["Name,Age\nAda,36\n"], "people.csv", { type: "text/csv" })

		const result = await new Promise<Record<string, unknown>[]>((resolve) => {
			parseCsvFile(
				file,
				{
					onComplete: (data) => resolve(data),
				},
				[
					{ name: "name", forms: ["name"] },
					{ name: "age", forms: ["age"], type: (value) => Number(value) },
				],
			)
		})

		expect(result).toEqual([{ name: "Ada", age: 36 }])
	})

	test("parses without accepted headings", async () => {
		const file = new File(["city\nAustin\n"], "cities.csv", { type: "text/csv" })

		const result = await new Promise<Record<string, unknown>[]>((resolve) => {
			parseCsvFile(file, {
				beforeInferHeadings: vi.fn(),
				afterInferHeadings: vi.fn(),
				beforeRowParse: vi.fn(),
				afterRowParse: vi.fn(),
				onComplete: (data) => resolve(data),
			})
		})

		expect(result[0]).toHaveProperty("city", "Austin")
	})
})
