import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { CurrencyInput } from "@/components/Inputs/CurrencyInput"

describe("components/Inputs/CurrencyInput", () => {
	test("defaults the prefix to the locale currency symbol", () => {
		render(
			<MantineProvider>
				<CurrencyInput aria-label="Amount" />
			</MantineProvider>,
		)

		expect(screen.getByText("$")).toBeTruthy()
	})

	test("uses an explicit symbol when provided", () => {
		render(
			<MantineProvider>
				<CurrencyInput aria-label="Amount" symbol="€" />
			</MantineProvider>,
		)

		expect(screen.getByText("€")).toBeTruthy()
	})
})
