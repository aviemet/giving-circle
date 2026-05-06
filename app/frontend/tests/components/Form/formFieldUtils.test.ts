import { describe, expect, test } from "vitest"

import { nameToPath } from "@/components/Form"

describe("components/Form/formFieldUtils", () => {
	test("nameToPath converts rails-style names to dot paths", () => {
		expect(nameToPath("user.email")).toBe("user.email")
		expect(nameToPath("template.slides_attributes[0].title")).toBe("template.slides_attributes.0.title")
	})
})

