import { beforeEach, describe, expect, test } from "vitest"

import { dayjs } from "@/lib/dayjs"
import { currency, number } from "@/lib/formatters"
import { i18n } from "@/lib/i18n"
import {
	DEFAULT_APP_LOCALE,
	getCurrentAppLocale,
	intlLocale,
	resolveLocale,
	setCurrentAppLocale,
} from "@/lib/locale"
import { useLocaleStore } from "@/store/LocaleStore"

describe("LocaleStore", () => {
	beforeEach(async () => {
		localStorage.clear()
		await useLocaleStore.getState().setLocale("en-US")
	})

	test("setLocale updates store, i18n, current app locale, and dayjs", async () => {
		await useLocaleStore.getState().setLocale("de-DE")

		expect(useLocaleStore.getState().locale).toBe("de-DE")
		expect(getCurrentAppLocale()).toBe("de-DE")
		expect(i18n.language).toBe("de-DE")
		expect(dayjs.locale()).toBe("de")
		expect(intlLocale()).toBe("de-DE")
		expect(localStorage.getItem("giving-circle.locale")).toBe("de-DE")
	})

	test("normalizes en to en-US in the store and localStorage", async () => {
		await useLocaleStore.getState().setLocale("en")

		expect(resolveLocale("en")).toBe("en-US")
		expect(DEFAULT_APP_LOCALE).toBe("en-US")
		expect(useLocaleStore.getState().locale).toBe("en-US")
		expect(i18n.language).toBe("en-US")
		expect(localStorage.getItem("giving-circle.locale")).toBe("en-US")
	})

	test("unknown locale resolves to default app locale en-US", async () => {
		await useLocaleStore.getState().setLocale("not-a-real-locale")

		expect(useLocaleStore.getState().locale).toBe("en-US")
		expect(intlLocale()).toBe("en-US")
		expect(localStorage.getItem("giving-circle.locale")).toBe("en-US")
	})
})

describe("formatters with locale adapters", () => {
	beforeEach(() => {
		setCurrentAppLocale("en-US")
	})

	test("formats currency with en-US when app locale is en-US", () => {
		expect(currency.format(500, "USD")).toBe("$500.00")
		expect(currency.whole(500, "USD")).toBe("$500")
		expect(currency.compact(304_000, "USD")).toBe("$304K")
	})

	test("formats currency for an explicit intl locale override", () => {
		expect(currency.format(500, "EUR", "de-DE")).toBe("500,00\u00A0€")
	})

	test("uses current app locale intl mapping when no override is provided", () => {
		setCurrentAppLocale("de-DE")
		expect(currency.format(500, "EUR")).toBe("500,00\u00A0€")
		expect(number.decimal(12.345, 1)).toBe("12,3")
	})
})
