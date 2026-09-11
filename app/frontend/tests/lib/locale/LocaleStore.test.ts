import { beforeEach, describe, expect, test } from "vitest"

import { dayjs } from "@/lib/dayjs"
import { currency, number } from "@/lib/formatters"
import { i18n } from "@/lib/i18n"
import { intlLocale } from "@/lib/locale"
import { useLocaleStore } from "@/store/LocaleStore"

describe("LocaleStore", () => {
	beforeEach(async () => {
		localStorage.clear()
		await useLocaleStore.getState().setLocale("en")
	})

	test("setLocale updates store, i18n, and dayjs", async () => {
		await useLocaleStore.getState().setLocale("en")

		expect(useLocaleStore.getState().locale).toBe("en")
		expect(i18n.language).toBe("en")
		expect(dayjs.locale()).toBe("en")
		expect(intlLocale()).toBe("en")
		expect(localStorage.getItem("giving-circle.locale")).toBe("en")
	})

	test("unsupported locales fall back to en", async () => {
		await useLocaleStore.getState().setLocale("not-a-real-locale")

		expect(useLocaleStore.getState().locale).toBe("en")
		expect(i18n.resolvedLanguage).toBe("en")
		expect(localStorage.getItem("giving-circle.locale")).toBe("en")
	})
})

describe("formatters with locale adapters", () => {
	test("formats currency with the current i18n locale", () => {
		expect(currency.format(500, "USD")).toBe("$500.00")
		expect(currency.whole(500, "USD")).toBe("$500")
		expect(currency.compact(304_000, "USD")).toBe("$304K")
		expect(number.decimal(12.345, 1)).toBe("12.3")
	})

	test("formats currency for an explicit intl locale override", () => {
		expect(currency.format(500, "EUR", "de-DE")).toBe("500,00\u00A0€")
	})
})
