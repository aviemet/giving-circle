import fs from "node:fs"
import path from "node:path"

import { hasFlag } from "country-flag-icons"
import { describe, expect, test } from "vitest"

import { localeRegistry, registryLocaleIds } from "@/lib/locale"

describe("localeRegistry", () => {
	const localesDir = path.resolve(import.meta.dirname, "../../../lib/locales")
	const dayjsLocaleDir = path.resolve(import.meta.dirname, "../../../../../node_modules/dayjs/locale")

	test("includes every exported locale JSON file", () => {
		const jsonIds = fs.readdirSync(localesDir)
			.filter(name => name.endsWith(".json"))
			.map(name => name.replace(/\.json$/, ""))
			.sort()

		expect([...registryLocaleIds].sort()).toEqual(jsonIds)
	})

	test("maps every locale to an existing dayjs locale file", () => {
		const dayjsIds = new Set(
			fs.readdirSync(dayjsLocaleDir)
				.filter(name => name.endsWith(".js") && !name.endsWith(".d.ts"))
				.map(name => name.replace(/\.js$/, "")),
		)

		for(const id of registryLocaleIds) {
			const definition = localeRegistry[id]
			expect(definition).toBeDefined()
			expect(dayjsIds.has(definition.dayjsLocale)).toBe(true)
		}
	})

	test("maps every locale to a country-flag-icons region", () => {
		for(const id of registryLocaleIds) {
			expect(hasFlag(localeRegistry[id].flagRegion)).toBe(true)
		}
	})

	test("maps app locale en to intl en-US and dayjs en", () => {
		expect(localeRegistry.en).toEqual({
			id: "en",
			intlLocale: "en-US",
			dayjsLocale: "en",
			flagRegion: "US",
		})
	})
})
