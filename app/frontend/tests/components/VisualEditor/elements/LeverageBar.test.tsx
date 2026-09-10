import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { leverageBarConfig } from "@/components/VisualEditor/components/LeverageBar"
import {
	LeverageBar,
	type LeverageBarColors,
} from "@/components/VisualEditor/elements/LeverageBar"
import { defaultLeverageBarSize } from "@/components/VisualEditor/fields/leverageBarSize"
import { buildMockLeverage } from "@/features/presentation/values/leverageTotals"
import { fromCents } from "@/lib/money"

const defaultColors: LeverageBarColors = {
	remainingColor: "#7CFF2B",
	trackColor: "#1B2A4A",
}

describe("components/VisualEditor/elements/LeverageBar", () => {
	test("renders compact remaining amount by default", () => {
		render(
			<MantineProvider>
				<LeverageBar
					totals={ buildMockLeverage("USD") }
					colors={ defaultColors }
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("$60K")).toBeTruthy()
	})

	test("applies border radius on the bar root", () => {
		const { container } = render(
			<MantineProvider>
				<LeverageBar
					totals={ buildMockLeverage("USD") }
					colors={ {
						...defaultColors,
						borderRadius: 12,
					} }
				/>
			</MantineProvider>,
		)

		const root = container.querySelector("[style*=\"border-radius: 12px\"]")
		expect(root).toBeTruthy()
	})

	test("formats remaining with whole currency mode", () => {
		render(
			<MantineProvider>
				<LeverageBar
					totals={ {
						remaining: fromCents(6_000_000, "USD"),
						total: fromCents(40_000_000, "USD"),
					} }
					colors={ defaultColors }
					currencyFormat="whole"
				/>
			</MantineProvider>,
		)

		expect(screen.getByText("$60,000")).toBeTruthy()
	})
})

describe("components/VisualEditor/components/LeverageBar", () => {
	test("uses a dedicated size field instead of flex-item Fill/Auto", () => {
		expect(leverageBarConfig.inline).toBe(true)
		expect(leverageBarConfig.fields).toHaveProperty("size")
		expect(leverageBarConfig.fields).not.toHaveProperty("sizing")
		expect(leverageBarConfig.defaultProps?.size).toEqual(defaultLeverageBarSize())
	})

	test("resolveData normalizes the current size field", async () => {
		const resolveData = leverageBarConfig.resolveData
		expect(resolveData).toBeTypeOf("function")
		if(resolveData === undefined) {
			return
		}

		const resolved = await resolveData({
			props: {
				id: "leverage-bar-current",
				currencyFormat: "compact",
				size: {
					width: { amount: 100, unit: "%" },
					height: { amount: 28, unit: "px" },
				},
			},
		}, {
			changed: {},
			lastData: null,
			trigger: "load",
			metadata: {},
			parent: null,
			root: { props: {} },
		})

		expect(resolved.props?.size).toEqual({
			width: { amount: 100, unit: "%" },
			height: { amount: 28, unit: "px" },
		})
	})
})

describe("components/VisualEditor/config leverage bar", () => {
	test("registers LeverageBar in the elements category", async () => {
		const { config } = await import("@/components/VisualEditor/config")

		expect(config.categories?.elements?.components).toContain("LeverageBar")
		expect(config.components?.LeverageBar).toBeDefined()
	}, 35000)
})
