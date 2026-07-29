import { describe, expect, test } from "vitest"

import {
	DEFAULT_LOCALE,
	dayjsLocale,
	flagRegion,
	getCurrentAppLocale,
	getLocaleDefinition,
	intlLocale,
	localeDisplayName,
	localeLabelsDiffer,
	localeOptions,
	resolveLocale,
	setCurrentAppLocale,
} from "@/lib/locale/resolve"

describe("lib/locale/resolve", () => {
	test("resolveLocale canonicalizes known ids and falls back", () => {
		expect(resolveLocale("")).toBe(resolveLocale(DEFAULT_LOCALE))
		expect(resolveLocale("en_GB")).toBe("en-GB")
		expect(resolveLocale("fr")).toBe(resolveLocale("fr-FR") === "fr-FR" ? resolveLocale("fr") : resolveLocale("fr"))
		expect(typeof resolveLocale("zz-unknown")).toBe("string")
	})

	test("setCurrentAppLocale and getters", () => {
		const previous = getCurrentAppLocale()
		setCurrentAppLocale("fr-FR")
		expect(getCurrentAppLocale()).toBe("fr-FR")
		expect(intlLocale()).toBe(getLocaleDefinition().intlLocale)
		expect(dayjsLocale()).toBe(getLocaleDefinition().dayjsLocale)
		expect(flagRegion()).toBe(getLocaleDefinition().flagRegion)
		setCurrentAppLocale(previous)
	})

	test("localeDisplayName and localeOptions", () => {
		expect(localeDisplayName("en-US").length).toBeGreaterThan(0)
		expect(localeLabelsDiffer("English", "Anglais")).toBe(true)
		expect(localeLabelsDiffer("English", "english")).toBe(false)

		const options = localeOptions("en")
		expect(options.length).toBeGreaterThan(0)
		expect(options[0]).toHaveProperty("id")
		expect(options[0]).toHaveProperty("nativeLabel")
		expect(options[0]).toHaveProperty("translatedLabel")
		expect(options[0]).toHaveProperty("flagRegion")
	})
})
