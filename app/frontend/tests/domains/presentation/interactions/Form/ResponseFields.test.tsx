import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { ResponseFields } from "@/domains/presentation/interactions/Form/ResponseFields"
import { createPresentationOrgPersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentation/interactions/Form/ResponseFields", () => {
	const org = createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" })
	const context = {
		presentation_orgs: [org],
		choices: {
			color: ["red", "blue"],
		},
	}

	test("renders text, number, money, select, and org fields", () => {
		render(
			<ResponseFields
				namePrefix="presentation_interaction_response.response_data"
				context={ context }
				responseData={ {
					note: "hello",
					count: 3,
					gift: { amount_cents: 500, currency: "USD" },
					color: "red",
					org: "org-1",
				} }
				fields={ [
					{ key: "note", type: "text", label: "Note" },
					{ key: "count", type: "number", label: "Count", options: { min: 0, max: 10 } },
					{ key: "gift", type: "money", label: "Gift" },
					{ key: "color", type: "single_select", label: "Color", options: { choices: ["red", "blue"] } },
					{ key: "org", type: "org_reference", label: "Organization" },
				] }
			/>,
		)

		expect(screen.getByLabelText("Note")).toHaveValue("hello")
		expect(screen.getByLabelText("Count")).toBeTruthy()
		expect(screen.getByLabelText(/Gift/)).toBeTruthy()
		expect(screen.getByLabelText("Currency")).toHaveValue("USD")
		expect(screen.getByText("Color")).toBeTruthy()
		expect(screen.getByText("Organization")).toBeTruthy()
	})

	test("renders org money map and ranked list fields", () => {
		render(
			<ResponseFields
				namePrefix="presentation_interaction_response.response_data"
				context={ context }
				responseData={ {
					allocations: [{ org_id: "org-1", amount_cents: 1000 }],
					ranks: [{ org_id: "org-1", rank: 1 }],
				} }
				fields={ [
					{ key: "allocations", type: "org_money_map", label: "Allocations" },
					{ key: "ranks", type: "org_ranked_list", label: "Ranks" },
				] }
			/>,
		)

		expect(screen.getByLabelText("Org One (cents)")).toBeTruthy()
		expect(screen.getByLabelText("Org One rank")).toBeTruthy()
	})

	test("boolean field type renders nothing", () => {
		const { container } = render(
			<ResponseFields
				namePrefix="presentation_interaction_response.response_data"
				context={ context }
				responseData={ { flag: true } }
				fields={ [{ key: "flag", type: "boolean", label: "Flag" }] }
			/>,
		)

		expect(screen.queryByLabelText("Flag")).toBeNull()
		expect(container.querySelector("input")).toBeNull()
	})

	test("field group renders nested fields", () => {
		render(
			<ResponseFields
				namePrefix="presentation_interaction_response.response_data"
				context={ context }
				responseData={ {
					entries: [{ note: "nested" }],
				} }
				fields={ [{
					key: "entries",
					type: "field_group",
					label: "Entries",
					fields: [{ key: "note", type: "text", label: "Nested note" }],
					options: { min: 1 },
				}] }
			/>,
		)

		expect(screen.getByLabelText("Nested note")).toHaveValue("nested")
	})
})
