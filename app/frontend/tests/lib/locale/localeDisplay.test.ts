import { describe, expect, test } from "vitest"

import {
	localeDisplayName,
	localeLabelsDiffer,
	localeOptions,
	localeRegistry,
	resolveLocale,
} from "@/lib/locale"

describe("locale display names and options", () => {
	test("uses registry intlLocale so zh-YUE resolves to Cantonese / 粵語", () => {
		expect(localeRegistry["zh-YUE"].intlLocale).toBe("yue")
		expect(localeDisplayName("zh-YUE", "en")).toBe("Cantonese")
		expect(localeDisplayName("zh-YUE", "zh-YUE")).toBe("粵語")
	})

	test("maps ua intlLocale to uk for Ukrainian labels", () => {
		expect(localeRegistry.ua.intlLocale).toBe("uk")
		expect(localeDisplayName("ua", "en")).toBe("Ukrainian")
	})

	test("resolveLocale canonicalizes bare language ids to home regional ids", () => {
		expect(resolveLocale("en")).toBe("en-US")
		expect(resolveLocale("lo")).toBe("lo-LA")
		expect(resolveLocale("de")).toBe("de-DE")
		expect(resolveLocale("pt")).toBe("pt")
	})

	test("picker uses regional English and Lao ids instead of bare language codes", () => {
		const ids = localeOptions("en-US").map(option => option.id)

		expect(ids).toContain("en-US")
		expect(ids).not.toContain("en")
		expect(ids).toContain("en-GB")

		expect(ids).toContain("lo-LA")
		expect(ids).not.toContain("lo")

		expect(ids).toContain("de-DE")
		expect(ids).not.toContain("de")

		expect(ids).toContain("pt")
		expect(ids).toContain("pt-BR")
	})

	test("dedupes intlLocale collisions to a single picker row", () => {
		const ids = localeOptions("en").map(option => option.id)

		expect(ids.filter(id => id === "en" || id === "en-US")).toEqual(["en-US"])
		expect(ids.filter(id => id === "ua" || id === "uk")).toEqual(["uk"])
	})

	test("capitalizes native labels and pairs them with translated labels", () => {
		const french = localeOptions("en").find(option => option.id === "fr-FR")
		expect(french).toBeDefined()
		expect(french?.nativeLabel).toBe("Français (France)")
		expect(french?.translatedLabel).toBe("French (France)")
		expect(localeLabelsDiffer(french!.nativeLabel, french!.translatedLabel)).toBe(true)

		const arabic = localeOptions("en").find(option => option.id === "ar")
		expect(arabic?.nativeLabel).toBe("العربية")
		expect(arabic?.translatedLabel).toBe("Arabic")
	})

	test("never lists raw locale codes as the only label", () => {
		for(const option of localeOptions("en")) {
			expect(option.nativeLabel.toLowerCase()).not.toBe(option.id.toLowerCase())
			expect(option.translatedLabel.toLowerCase()).not.toBe(option.id.toLowerCase())
		}
	})

	test("capitalizes Latin native labels", () => {
		const uncapitalized = localeOptions("en").filter(option => /^[a-zà-öø-ÿ]/.test(option.nativeLabel))
		expect(uncapitalized.map(option => `${option.id}:${option.nativeLabel}`)).toEqual([])
	})

	test("keeps real names for minority locales that used to show as codes", () => {
		const options = localeOptions("en")
		const sardinian = options.find(option => option.id === "sc")
		const dzongkha = options.find(option => option.id === "dz")
		const upperSorbian = options.find(option => option.id === "hsb")

		expect(sardinian?.nativeLabel.toLowerCase()).not.toBe("sc")
		expect(sardinian?.translatedLabel).toBe("Sardinian")
		expect(dzongkha?.translatedLabel).toBe("Dzongkha")
		expect(upperSorbian?.translatedLabel).toBe("Upper Sorbian")
	})

	test("labels Papiamento locales with the language name, not the pap code", () => {
		expect(localeDisplayName("pap-AW", "en")).toMatch(/^Papiamento/)
		expect(localeDisplayName("pap-CW", "en")).toMatch(/^Papiamento/)
		expect(localeDisplayName("pap-AW", "en").toLowerCase()).not.toMatch(/^pap\b/)

		const aruba = localeOptions("en").find(option => option.id === "pap-AW")
		expect(aruba?.nativeLabel.toLowerCase()).toMatch(/^papiamento/)
		expect(aruba?.translatedLabel.toLowerCase()).toMatch(/^papiamento/)
	})

	test("keeps Chrome-broken language codes via explicit fallbacks", () => {
		const options = localeOptions("en")
		expect(options.some(option => option.id === "pap-AW")).toBe(true)
		expect(options.some(option => option.id === "pap-CW")).toBe(true)
		expect(options.some(option => option.id === "sc")).toBe(true)
		expect(options.some(option => option.id === "dz")).toBe(true)
		expect(options.some(option => option.id === "hsb")).toBe(true)
	})
})
