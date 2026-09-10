import { type CustomField } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import {
	getIterateItems,
	getIteratePathPrefix,
	iterateField,
	ITERATE_FINALIST_ORGS,
	ITERATE_NONE,
	ITERATE_ORGS,
	isFinalistOrgIterate,
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

function renderIterateField(value: typeof ITERATE_NONE | typeof ITERATE_ORGS | typeof ITERATE_FINALIST_ORGS) {
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
		expect(normalizeIterateValue(ITERATE_FINALIST_ORGS)).toBe(ITERATE_FINALIST_ORGS)
	})

	test("isIterateValue accepts only known values", () => {
		expect(isIterateValue(ITERATE_NONE)).toBe(true)
		expect(isIterateValue(ITERATE_ORGS)).toBe(true)
		expect(isIterateValue(ITERATE_FINALIST_ORGS)).toBe(true)
		expect(isIterateValue("presentation.membership")).toBe(false)
		expect(isIterateOn(ITERATE_ORGS)).toBe(true)
		expect(isIterateOn(ITERATE_FINALIST_ORGS)).toBe(true)
		expect(isIterateOn(ITERATE_NONE)).toBe(false)
	})

	test("getIteratePathPrefix returns the path for each collection", () => {
		expect(getIteratePathPrefix(ITERATE_ORGS)).toBe("presentation.org")
		expect(getIteratePathPrefix(ITERATE_FINALIST_ORGS)).toBe("presentation.finalist_org")
		expect(getIteratePathPrefix(ITERATE_NONE)).toBe("presentation.org")
	})

	test("getIterateItems returns orgs only when iterating organizations", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "River Conservancy" })
		const context = {
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({ orgs: [org] }),
			values: undefined,
			elementControls: {},
			activeSlideId: undefined,
			isSubscribed: false,
		}

		expect(getIterateItems(context, ITERATE_NONE)).toEqual([])
		expect(getIterateItems(context, ITERATE_ORGS)).toEqual([org])
		expect(isOrgIterate(ITERATE_ORGS)).toBe(true)
	})

	test("getIterateItems returns finalist orgs filtered by live values", () => {
		const orgOne = createPresentationOrgPersisted({ id: "org-1", name: "River Conservancy" })
		const orgTwo = createPresentationOrgPersisted({ id: "org-2", name: "Coastal Trust" })
		const context = {
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({ orgs: [orgOne, orgTwo] }),
			values: {
				finalist_org_ids: ["org-1"],
				allocated_totals: [],
				pledge_totals: [],
				funding_totals: [],
				funded_org_ids: [],
				leverage: null,
				org_vote_totals: [],
				vote_counts: [],
				money_totals: [],
				rank_totals: [],
			},
			elementControls: {},
			activeSlideId: undefined,
			isSubscribed: true,
		}

		expect(getIterateItems(context, ITERATE_FINALIST_ORGS)).toEqual([orgOne])
		expect(isFinalistOrgIterate(ITERATE_FINALIST_ORGS)).toBe(true)
	})

	test("getIterateItems returns all orgs for finalist iterate when no vote has narrowed the field", () => {
		const orgOne = createPresentationOrgPersisted({ id: "org-1" })
		const orgTwo = createPresentationOrgPersisted({ id: "org-2" })
		const context = {
			circle: createCirclePersisted(),
			presentation: createPresentationPresentation({ orgs: [orgOne, orgTwo] }),
			values: undefined,
			elementControls: {},
			activeSlideId: undefined,
			isSubscribed: false,
		}

		expect(getIterateItems(context, ITERATE_FINALIST_ORGS)).toEqual([orgOne, orgTwo])
	})

	test("Iterate field is labeled Iterate with an Off/On toggle", () => {
		expect(iterateField().label).toBe("Iterate")
		expect(i18n.t("slides.editor.fields.iterate.toggle_off")).toBe("Off")
		expect(i18n.t("slides.editor.fields.iterate.toggle_on")).toBe("On")
		expect(i18n.t("slides.editor.fields.iterate.organizations")).toBe("Organizations")
		expect(i18n.t("slides.editor.fields.iterate.finalist_organizations")).toBe("Finalist organizations")
		expect(i18n.t("slides.editor.fields.iterate.hint")).toBe("Iterates for each organization")
		expect(i18n.t("slides.editor.fields.iterate.hint_finalist_organizations")).toBe("Iterates for each finalist organization")
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

	test("shows finalist organizations in the collection dropdown", () => {
		renderIterateField(ITERATE_FINALIST_ORGS)

		expect(screen.getByRole("combobox", { name: "Over" })).toHaveValue("Finalist organizations")
	})
})
