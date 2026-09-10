import { describe, expect, test } from "vitest"

import { i18n } from "@/lib/i18n"
import {
	DEFAULT_LOCALE,
	flagRegion,
	intlLocale,
	localeDisplayName,
	localeIds,
} from "@/lib/locale"

describe("lib/locale", () => {
	test("intlLocale follows i18n, defaulting to en", () => {
		expect(DEFAULT_LOCALE).toBe("en")
		expect(intlLocale()).toBe(i18n.language || DEFAULT_LOCALE)
		expect(intlLocale("")).toBe("en")
		expect(intlLocale("de-DE")).toBe("de-DE")
	})

	test("flagRegion uses Intl likely subtags", () => {
		expect(flagRegion("en")).toBe("US")
		expect(flagRegion("de-DE")).toBe("DE")
	})

	test("localeDisplayName uses Intl language names", () => {
		expect(localeDisplayName("en", "en")).toBe("English")
		expect(localeDisplayName("de", "en")).toBe("German")
	})

	test("localeIds are the exported i18n packs", () => {
		expect(localeIds).toEqual(["en"])
	})
})
