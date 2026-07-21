import { describe, expect, it } from "vitest"

import { type InteractionFieldConfig } from "@/domains/presentation/interactions/Form/FieldBuilder"
import {
	outputSourceFields,
	sanitizeOutput,
	sanitizeOutputs,
} from "@/domains/presentation/interactions/Form/OutputBuilder"

describe("outputSourceFields", () => {
	it("includes leaf fields with keys and skips empty keys", () => {
		const fields: InteractionFieldConfig[] = [
			{ key: "allocations", type: "org_money_map", label: "Allocate" },
			{ key: "", type: "text", label: "Draft" },
		]

		expect(outputSourceFields(fields)).toHaveLength(1)
		expect(outputSourceFields(fields)[0]?.key).toBe("allocations")
	})

	it("flattens nested field groups without including the group container", () => {
		const fields: InteractionFieldConfig[] = [
			{
				key: "group",
				type: "field_group",
				label: "Group",
				fields: [
					{ key: "vote", type: "org_reference", label: "Vote" },
				],
			},
		]

		expect(outputSourceFields(fields)).toEqual([
			{ key: "vote", type: "org_reference", label: "Vote" },
		])
	})
})

describe("sanitizeOutput", () => {
	const reducers = ["sum_by_org", "count_by_value", "sum_money", "rank_aggregate"]

	it("clears incompatible reducers for the selected field type", () => {
		const fields: InteractionFieldConfig[] = [
			{ key: "amount", type: "number", label: "Amount" },
		]

		expect(sanitizeOutput({
			metric: "allocated_totals",
			source_field: "amount",
			reducer: "sum_by_org",
		}, fields, reducers)).toEqual({
			metric: "allocated_totals",
			source_field: "amount",
			reducer: "",
		})
	})

	it("keeps compatible reducers", () => {
		const fields: InteractionFieldConfig[] = [
			{ key: "allocations", type: "org_money_map", label: "Allocate" },
		]

		expect(sanitizeOutput({
			metric: "allocated_totals",
			source_field: "allocations",
			reducer: "sum_by_org",
		}, fields, reducers).reducer).toBe("sum_by_org")
	})

	it("sanitizes all outputs in a list", () => {
		const fields: InteractionFieldConfig[] = [
			{ key: "note", type: "text", label: "Note" },
		]

		expect(sanitizeOutputs([{
			metric: "allocated_totals",
			source_field: "note",
			reducer: "sum_by_org",
		}], fields, reducers)[0]?.reducer).toBe("")
	})
})
