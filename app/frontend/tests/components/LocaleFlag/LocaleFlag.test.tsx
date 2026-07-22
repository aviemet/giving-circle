import { render, screen } from "@testing-library/react"
import { hasFlag } from "country-flag-icons"
import { describe, expect, test } from "vitest"

import { LocaleFlag } from "@/components/LocaleFlag"

describe("LocaleFlag", () => {
	test("renders a flag when country-flag-icons hasFlag is true", () => {
		expect(hasFlag("US")).toBe(true)
		const { container } = render(<LocaleFlag region="US" title="United States" />)
		expect(container.querySelector("svg")).not.toBeNull()
		expect(screen.getByTitle("United States")).toBeTruthy()
	})

	test("renders nothing when the region has no flag", () => {
		expect(hasFlag("ZZ")).toBe(false)
		const { container } = render(<LocaleFlag region="ZZ" />)
		expect(container.querySelector("svg")).toBeNull()
	})
})
