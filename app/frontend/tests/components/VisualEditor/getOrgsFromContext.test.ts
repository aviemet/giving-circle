import { describe, expect, test } from "vitest"

import { getOrgsFromContext } from "@/components/VisualEditor/dynamicData/getOrgsFromContext"
import {
	createCircleMock,
	createOrgPersisted,
	createPresentationInertiaShare,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"

describe("components/VisualEditor/dynamicData/getOrgsFromContext", () => {
	test("returns presentation orgs when present", () => {
		const org = createPresentationOrgPersisted({ id: "org-a", name: "Org A" })
		const presentation = createPresentationPresentation({ orgs: [org] })
		const circle = createCircleMock()

		expect(getOrgsFromContext({ circle, presentation })).toEqual([org])
	})

	test("falls back to circle orgs when presentation orgs are empty", () => {
		const org = createOrgPersisted({ id: "org-b", name: "Org B" })
		const circle = createCircleMock({ orgs: [org] })
		const presentation = createPresentationPresentation({ orgs: [] })

		expect(getOrgsFromContext({ circle, presentation })).toEqual([org])
	})

	test("falls back to circle orgs when presentation has no orgs field", () => {
		const org = createOrgPersisted({ id: "org-c", name: "Org C" })
		const circle = createCircleMock({ orgs: [org] })
		const presentation = createPresentationInertiaShare()

		expect(getOrgsFromContext({ circle, presentation })).toEqual([org])
	})

	test("returns empty array when no orgs are available", () => {
		const circle = createCircleMock({ orgs: [] })
		const presentation = createPresentationPresentation({ orgs: [] })

		expect(getOrgsFromContext({ circle, presentation })).toEqual([])
	})
})
