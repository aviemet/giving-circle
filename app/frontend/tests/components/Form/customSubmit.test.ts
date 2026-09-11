import { describe, expect, test } from "vitest"

import { defaultNormalizeSubmitError } from "@/components/Form/customSubmit"

describe("components/Form/customSubmit", () => {
	test("reads nested response errors from an object", () => {
		expect(defaultNormalizeSubmitError({
			response: {
				data: {
					errors: {
						name: "can't be blank",
					},
				},
			},
		})).toEqual({ name: "can't be blank" })
	})

	test("reads top-level errors from an object", () => {
		expect(defaultNormalizeSubmitError({
			errors: {
				email: "is invalid",
			},
		})).toEqual({ email: "is invalid" })
	})

	test("returns an empty object for non-objects", () => {
		expect(defaultNormalizeSubmitError("nope")).toEqual({})
		expect(defaultNormalizeSubmitError(null)).toEqual({})
	})
})
