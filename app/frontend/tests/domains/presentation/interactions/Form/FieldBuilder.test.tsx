import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { AnswerCard } from "@/domains/presentation/interactions/Form/AnswerCard"
import {
	referenceNameFromLabel,
	type InteractionFieldConfig,
} from "@/domains/presentation/interactions/Form/FieldBuilder"
import { InteractionConfigPipeline } from "@/domains/presentation/interactions/Form/InteractionConfigPipeline"
import {
	defaultOutputForField,
	rewriteOutputSourceFields,
} from "@/domains/presentation/interactions/Form/OutputBuilder"
import { render } from "@/tests/helpers/utils"

describe("referenceNameFromLabel", () => {
	test("slugifies prompts into snake_case reference names", () => {
		expect(referenceNameFromLabel("Allocate to organizations")).toBe("allocate_to_organizations")
		expect(referenceNameFromLabel("")).toBe("")
	})
})

describe("rewriteOutputSourceFields", () => {
	test("rewrites linked output source when answer key changes", () => {
		const outputs = rewriteOutputSourceFields(
			[{ metric: "allocated_totals", source_field: "old_key", reducer: "sum_by_org" }],
			"old_key",
			"new_key",
		)

		expect(outputs[0]?.source_field).toBe("new_key")
	})
})

describe("defaultOutputForField", () => {
	test("locks source_field to the answer key", () => {
		const output = defaultOutputForField(
			{ key: "allocations", type: "org_money_map", label: "Allocate" },
			["sum_by_org"],
			["allocated_totals"],
		)

		expect(output.source_field).toBe("allocations")
		expect(output.reducer).toBe("sum_by_org")
	})
})

describe("AnswerCard", () => {
	test("renders human labels and auto-fills reference name", async () => {
		const user = userEvent.setup()

		function Harness() {
			const [field, setField] = React.useState<InteractionFieldConfig>({
				key: "",
				type: "text",
				label: "",
			})

			return (
				<AnswerCard
					field={ field }
					fieldTypes={ ["text", "org_money_map"] }
					onChange={ setField }
				/>
			)
		}

		render(<Harness />)

		expect(screen.getByText("Question / prompt")).toBeTruthy()
		expect(screen.getByText("Answer type")).toBeTruthy()

		const prompt = screen.getAllByRole("textbox")[0]
		await user.type(prompt, "My Prompt")

		expect(screen.getByDisplayValue("My Prompt")).toBeTruthy()

		await user.click(screen.getByText("Advanced"))
		expect(screen.getByDisplayValue("my_prompt")).toBeTruthy()
	})
})

describe("InteractionConfigPipeline", () => {
	test("renders member screen tiles and paired answer to result without from-answer select", () => {
		render(
			<InteractionConfigPipeline
				fields={ [{
					key: "allocations",
					type: "org_money_map",
					label: "Allocate to organizations",
				}] }
				outputs={ [{
					metric: "allocated_totals",
					source_field: "allocations",
					reducer: "sum_by_org",
				}] }
				fieldTypes={ ["org_money_map"] }
				metrics={ ["allocated_totals"] }
				reducers={ ["sum_by_org"] }
				uiTemplateId="ui-1"
				uiTemplates={ [{ id: "ui-1", name: "Allocation", slug: "allocation" }] }
				onUiTemplateChange={ vi.fn() }
				onConfigChange={ vi.fn() }
			/>,
		)

		expect(screen.getByText("Member screen")).toBeTruthy()
		expect(screen.getByRole("option", { name: /Allocation/i })).toBeTruthy()
		expect(screen.getByText("Answer 1")).toBeTruthy()
		expect(screen.getByText("Live on presentation")).toBeTruthy()
		expect(screen.getByText("Collects answers")).toBeTruthy()
		expect(screen.queryByText("From answer")).toBeNull()
		expect(screen.getByDisplayValue("Allocated totals")).toBeTruthy()
		expect(screen.getByDisplayValue("Sum by organization")).toBeTruthy()
		expect(screen.getByDisplayValue("Money per organization")).toBeTruthy()
	})

	test("removing an answer drops linked outputs", async () => {
		const user = userEvent.setup()
		const onConfigChange = vi.fn()

		render(
			<InteractionConfigPipeline
				fields={ [{
					key: "allocations",
					type: "org_money_map",
					label: "Allocate to organizations",
				}] }
				outputs={ [{
					metric: "allocated_totals",
					source_field: "allocations",
					reducer: "sum_by_org",
				}] }
				fieldTypes={ ["org_money_map"] }
				metrics={ ["allocated_totals"] }
				reducers={ ["sum_by_org"] }
				uiTemplateId="ui-1"
				uiTemplates={ [{ id: "ui-1", name: "Allocation", slug: "allocation" }] }
				onUiTemplateChange={ vi.fn() }
				onConfigChange={ onConfigChange }
			/>,
		)

		await user.click(screen.getByRole("button", { name: "Remove answer" }))

		expect(onConfigChange).toHaveBeenCalledWith({
			fields: [],
			outputs: [],
		})
	})
})
