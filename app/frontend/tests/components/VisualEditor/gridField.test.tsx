import { type CustomField } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import {
	defaultGridLayoutValue,
	gridField,
	type GridLayoutValue,
} from "@/components/VisualEditor/fields/grid"
import { i18n } from "@/lib/i18n"
import { render } from "@/tests/helpers/utils"

function renderGridField(value: GridLayoutValue = defaultGridLayoutValue()) {
	const field = gridField()
	if(field.type !== "custom") {
		throw new Error("gridField must be a custom field")
	}

	const customField: CustomField<GridLayoutValue | undefined> = field
	const onChange = vi.fn()

	render(
		customField.render({
			field: customField,
			name: "grid",
			id: "grid",
			value,
			onChange,
		}),
	)

	return onChange
}

describe("components/VisualEditor/fields/gridField", () => {
	test("Layout panel exposes compact grid controls", () => {
		expect(gridField().label).toBe("Layout")
		expect(i18n.t("slides.editor.fields.grid.labels.columns")).toBe("Columns")
		expect(i18n.t("slides.editor.fields.grid.labels.last_row")).toBe("Last row")
		expect(i18n.t("slides.editor.fields.grid.last_row.center")).toBe("Centered")
	})

	test("defaults to three columns with last row at the start", () => {
		renderGridField()

		expect(screen.getByDisplayValue("3")).toBeInTheDocument()
		expect(screen.getByRole("radio", { name: "Packed" })).toBeChecked()
		expect(screen.getByRole("radio", { name: "Centered" })).not.toBeChecked()
		expect(screen.getByRole("radio", { name: "Stretch" })).toBeChecked()
	})

	test("toggling last row Centered stores centerLastRow", async () => {
		const user = userEvent.setup()
		const onChange = renderGridField()

		await user.click(screen.getByRole("radio", { name: "Centered" }))

		expect(onChange).toHaveBeenCalledWith({
			...defaultGridLayoutValue(),
			centerLastRow: true,
		})
	})
})
