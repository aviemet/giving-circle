import { fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import { AnswerCard } from "@/domains/presentation/interactions/Form/AnswerCard"
import { InteractionConfigPipeline } from "@/domains/presentation/interactions/Form/InteractionConfigPipeline"
import { OrphanResults } from "@/domains/presentation/interactions/Form/OrphanResults"
import { render } from "@/tests/helpers/utils"

describe("AnswerCard options branches", () => {
	test("shows choices input for select fields", () => {
		const onChange = vi.fn()

		render(
			<AnswerCard
				field={ {
					key: "color",
					type: "single_select",
					label: "Color",
					options: { choices: ["red"] },
				} }
				fieldTypes={ ["text", "single_select", "number", "field_group"] }
				onChange={ onChange }
			/>,
		)

		const choices = screen.getByDisplayValue("red")
		fireEvent.change(choices, { target: { value: "red, blue" } })

		expect(onChange).toHaveBeenCalled()
		const nextField = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0]
		expect(nextField?.options?.choices).toEqual(["red", "blue"])
	})

	test("shows min and max for number fields", () => {
		render(
			<AnswerCard
				field={ {
					key: "count",
					type: "number",
					label: "Count",
					options: { min: 1, max: 5 },
				} }
				fieldTypes={ ["number"] }
				onChange={ vi.fn() }
			/>,
		)

		expect(screen.getByDisplayValue("1")).toBeTruthy()
		expect(screen.getByDisplayValue("5")).toBeTruthy()
	})

	test("shows nested field group controls", async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()

		render(
			<AnswerCard
				field={ {
					key: "entries",
					type: "field_group",
					label: "Entries",
					fields: [{ key: "note", type: "text", label: "Note" }],
					options: { repeatable: false },
				} }
				fieldTypes={ ["text", "field_group"] }
				onChange={ onChange }
			/>,
		)

		expect(screen.getByText("Answers in this group")).toBeTruthy()
		await user.click(screen.getByLabelText(/allow multiple entries/i))
		expect(onChange).toHaveBeenCalled()
	})
})

describe("OrphanResults", () => {
	test("renders nothing when all outputs are linked", () => {
		render(
			<OrphanResults
				fields={ [{ key: "allocations", type: "org_money_map", label: "Allocate" }] }
				outputs={ [{
					metric: "allocated_totals",
					source_field: "allocations",
					reducer: "sum_by_org",
				}] }
				metrics={ ["allocated_totals"] }
				reducers={ ["sum_by_org"] }
				onChange={ vi.fn() }
			/>,
		)

		expect(screen.queryByText("Unlinked results")).toBeNull()
	})

	test("lists and removes unlinked outputs", async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()

		render(
			<OrphanResults
				fields={ [{ key: "allocations", type: "org_money_map", label: "Allocate" }] }
				outputs={ [{
					metric: "allocated_totals",
					source_field: "missing",
					reducer: "sum_by_org",
				}] }
				metrics={ ["allocated_totals"] }
				reducers={ ["sum_by_org"] }
				onChange={ onChange }
			/>,
		)

		expect(screen.getByText("Unlinked results")).toBeTruthy()
		await user.click(screen.getByRole("button", { name: /remove/i }))
		expect(onChange).toHaveBeenCalledWith([])
	})
})

describe("InteractionConfigPipeline remaining branches", () => {
	test("hides answer pipeline when showAnswerPipeline is false", () => {
		render(
			<InteractionConfigPipeline
				fields={ [{
					key: "allocations",
					type: "org_money_map",
					label: "Allocate to organizations",
				}] }
				outputs={ [] }
				fieldTypes={ ["org_money_map"] }
				metrics={ ["allocated_totals"] }
				reducers={ ["sum_by_org"] }
				uiTemplateId="ui-1"
				uiTemplates={ [{ id: "ui-1", name: "Allocation", slug: "allocation" }] }
				onUiTemplateChange={ vi.fn() }
				onConfigChange={ vi.fn() }
				showAnswerPipeline={ false }
			/>,
		)

		expect(screen.getByText("Member screen")).toBeTruthy()
		expect(screen.queryByText("Collects answers")).toBeNull()
		expect(screen.queryByText("Answer 1")).toBeNull()
	})

	test("adds another answer when requested", async () => {
		const user = userEvent.setup()
		const onConfigChange = vi.fn()

		render(
			<InteractionConfigPipeline
				fields={ [] }
				outputs={ [] }
				fieldTypes={ ["text"] }
				metrics={ ["allocated_totals"] }
				reducers={ ["sum_by_org"] }
				uiTemplateId="ui-1"
				uiTemplates={ [{ id: "ui-1", name: "Allocation", slug: "allocation" }] }
				onUiTemplateChange={ vi.fn() }
				onConfigChange={ onConfigChange }
			/>,
		)

		await user.click(screen.getByRole("button", { name: /add another answer/i }))

		expect(onConfigChange).toHaveBeenCalled()
		const next = onConfigChange.mock.calls[0]?.[0]
		expect(next?.fields).toHaveLength(1)
	})

	test("notifies when member screen tile changes", async () => {
		const user = userEvent.setup()
		const onUiTemplateChange = vi.fn()

		render(
			<InteractionConfigPipeline
				fields={ [] }
				outputs={ [] }
				fieldTypes={ ["text"] }
				metrics={ [] }
				reducers={ [] }
				uiTemplateId="ui-1"
				uiTemplates={ [
					{ id: "ui-1", name: "Allocation", slug: "allocation" },
					{ id: "ui-2", name: "Pledges", slug: "pledges" },
				] }
				onUiTemplateChange={ onUiTemplateChange }
				onConfigChange={ vi.fn() }
			/>,
		)

		await user.click(screen.getByRole("option", { name: /Pledges/i }))
		expect(onUiTemplateChange).toHaveBeenCalledWith("ui-2")
	})
})
