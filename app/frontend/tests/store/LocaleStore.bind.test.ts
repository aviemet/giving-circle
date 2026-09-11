import { beforeEach, describe, expect, test } from "vitest"

import { bindLocaleStoreToI18n, useLocaleStore } from "@/store/LocaleStore"

describe("store/LocaleStore bindLocaleStoreToI18n", () => {
	beforeEach(async () => {
		localStorage.clear()
		await useLocaleStore.getState().setLocale("en")
	})

	test("binds once and hydrates from i18n", async () => {
		bindLocaleStoreToI18n()
		bindLocaleStoreToI18n()

		await useLocaleStore.getState().hydrateFromI18n()
		expect(useLocaleStore.getState().locale).toBeTruthy()
	})

	test("setLocale persists locale", async () => {
		await useLocaleStore.getState().setLocale("en")
		expect(localStorage.getItem("giving-circle.locale")).toBe("en")
		expect(useLocaleStore.getState().locale).toBe("en")
	})
})
