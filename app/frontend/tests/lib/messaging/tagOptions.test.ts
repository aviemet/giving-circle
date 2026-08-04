import { describe, expect, test } from "vitest"

import { normalizeMessagingTemplateString } from "@/lib/messaging/tagOptions"

describe("lib/messaging/tagOptions", () => {
	test("normalizeMessagingTemplateString converts mustache aliases to #path tokens", () => {
		expect(normalizeMessagingTemplateString("Hello {{member_name}} - {{presentation_name}}")).toBe(
			"Hello #membership.name - #presentation.name",
		)
	})

	test("normalizeMessagingTemplateString leaves #path tokens alone", () => {
		expect(normalizeMessagingTemplateString("Hi #circle.name")).toBe("Hi #circle.name")
	})
})
