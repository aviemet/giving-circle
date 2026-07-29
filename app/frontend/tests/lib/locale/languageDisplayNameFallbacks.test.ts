import { describe, expect, test } from "vitest"

import { languageDisplayNameFallback } from "@/lib/locale/languageDisplayNameFallbacks"

describe("lib/locale/languageDisplayNameFallbacks", () => {
	test("returns known fallbacks case-insensitively", () => {
		expect(languageDisplayNameFallback("dz")).toBe("Dzongkha")
		expect(languageDisplayNameFallback("HSB")).toBe("Upper Sorbian")
		expect(languageDisplayNameFallback("pap")).toBe("Papiamento")
		expect(languageDisplayNameFallback("sc")).toBe("Sardinian")
	})

	test("returns undefined for unknown subtags", () => {
		expect(languageDisplayNameFallback("xx")).toBeUndefined()
	})
})
