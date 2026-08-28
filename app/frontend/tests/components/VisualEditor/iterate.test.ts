import { type CustomField } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import {
	getIterateItems,
	iterateField,
	ITERATE_NONE,
	ITERATE_ORGS,
	isIterateOn,
	isIterateValue,
	isOrgIterate,
	normalizeIterateValue,
} from "@/components/VisualEditor/fields/iterate"
import { i18n } from "@/lib/i18n"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

function renderIterateField(value: typeof ITERATE_NONE | typeof ITERATE_ORGS) {
	const field = iterateField()
	if(field.type !== "custom") {
		throw new Error("iterateField must be a custom field")
	}

	const customField: CustomField<typeof value | undefined> = field
	const onChange = vi.fn()

	render(
		customField.render({
			field: customField,
			name: "iterate",
			id: "iterate",
			value,
			onChange,
		}),
	)

	return onChange
}

describe("components/VisualEditor/fields/iterate", () => {
	test("normalizeIterateValue defaults to none", () => {
		expect(normalizeIterateValue(undefined)).toBe(ITERATE_NONE)
		expect(normalizeIterateValue(ITERATE_NONE)).toBe(ITERATE_NONE)
		expect(normalizeIterateValue(ITERATE_ORGS)).toBe(ITERATE_ORGS)
	})

	test("isIterateValue accepts only known values", () => {
		expect(isIterateValue(ITERATE_NONE)).toBe(true)
		expect(isIterateValue(ITERATE_ORGS)).toBe(true)
		expect(isIterateValue("presentation.membership")).toBe(false)
		expect(isIterateOn(ITERATE_ORGS)).toBe(true)
		expect(isIterateOn(ITERATE_NONE)).toBe(false)
	})

	test("getIterateItems returns orgs only when iterating organizations", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "River Conservancy" })
		const context = {
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({ orgs: [org] }),
		}

		expect(getIterateItems(context, ITERATE_NONE)).toEqual([])
		expect(getIterateItems(context, ITERATE_ORGS)).toEqual([org])
		expect(isOrgIterate(ITERATE_ORGS)).toBe(true)
	})

	test("Iterate field is labeled Iterate with an Off/On toggle", () => {
		expect(iterateField().label).toBe("Iterate")
		expect(i18n.t("slides.editor.fields.iterate.toggle_off")).toBe("Off")
		expect(i18n.t("slides.editor.fields.iterate.toggle_on")).toBe("On")
		expect(i18n.t("slides.editor.fields.iterate.organizations")).toBe("Organizations")
		expect(i18n.t("slides.editor.fields.iterate.hint")).toBe("Iterates for each organization")
	})

	test("hides the collection dropdown until Iterate is on", async () => {
		const user = userEvent.setup()
		const onChange = renderIterateField(ITERATE_NONE)

		expect(screen.getByRole("radio", { name: "Off" })).toBeChecked()
		expect(screen.queryByRole("combobox", { name: "Over" })).not.toBeInTheDocument()

		await user.click(screen.getByRole("radio", { name: "On" }))
		expect(onChange).toHaveBeenCalledWith(ITERATE_ORGS)
	})

	test("shows the collection dropdown when Iterate is on", () => {
		renderIterateField(ITERATE_ORGS)

		expect(screen.getByRole("radio", { name: "On" })).toBeChecked()
		expect(screen.getByRole("combobox", { name: "Over" })).toHaveValue("Organizations")
	})
})
