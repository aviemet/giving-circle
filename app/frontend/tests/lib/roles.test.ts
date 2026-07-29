import { describe, expect, test } from "vitest"

import { administrableCircles } from "@/lib/roles"
import { createCircleInertiaShare, createRole } from "@/tests/helpers/fixtures"

describe("lib/roles", () => {
	test("returns empty when circles are missing", () => {
		expect(administrableCircles([], undefined)).toEqual([])
	})

	test("super admin sees all circles", () => {
		const circles = [
			createCircleInertiaShare({ id: "c1", slug: "c1" }),
			createCircleInertiaShare({ id: "c2", slug: "c2", name: "Circle 2" }),
		]
		const roles = [createRole({ name: "super_admin", resource_id: undefined })]

		expect(administrableCircles(roles, circles)).toEqual(circles)
	})

	test("circle admin only sees administered circles", () => {
		const circles = [
			createCircleInertiaShare({ id: "c1", slug: "c1" }),
			createCircleInertiaShare({ id: "c2", slug: "c2", name: "Circle 2" }),
		]
		const roles = [createRole({
			name: "admin",
			resource_type: "Circle",
			resource_id: "c2",
		})]

		expect(administrableCircles(roles, circles)).toEqual([circles[1]])
	})
})
