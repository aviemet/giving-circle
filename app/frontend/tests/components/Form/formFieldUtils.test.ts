import { describe, expect, test } from "vitest"

import { formFieldErrorMessage, nameToPath } from "@/components/Form"

describe("components/Form/formFieldUtils", () => {
	test("nameToPath converts rails-style names to dot paths", () => {
		expect(nameToPath("user.email")).toBe("user.email")
		expect(nameToPath("template.slides_attributes[0].title")).toBe("template.slides_attributes.0.title")
	})

	test("formFieldErrorMessage matches dotted names and Rails attribute keys", () => {
		expect(formFieldErrorMessage({ "user.email": "Is invalid" }, "user.email")).toBe("Is invalid")
		expect(formFieldErrorMessage({ name: ["Can't be blank"] }, "presentation_interaction.name")).toBe("Can't be blank")
		expect(formFieldErrorMessage({ config: "Is invalid" }, "presentation_interaction.config")).toBe("Is invalid")
		expect(formFieldErrorMessage({ name: "Can't be blank" }, "presentation_interaction.trigger_type")).toBeUndefined()
	})
})
