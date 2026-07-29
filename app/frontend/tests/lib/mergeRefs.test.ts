import { describe, expect, test } from "vitest"

import { mergeRefs } from "@/lib/mergeRefs"

describe("lib/mergeRefs", () => {
	test("invokes function refs and assigns object refs", () => {
		const objectRef: { current: string | null } = { current: null }
		let functionValue: string | null = null

		const merged = mergeRefs<string>([
			objectRef,
			(value) => {
				functionValue = value
			},
			null,
		])

		merged("hello")

		expect(objectRef.current).toBe("hello")
		expect(functionValue).toBe("hello")
	})
})
