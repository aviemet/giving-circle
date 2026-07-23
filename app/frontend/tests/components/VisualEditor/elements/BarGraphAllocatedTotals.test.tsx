import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import {
	BarGraphAllocatedTotals,
	type AllocatedTotalEntry,
	type BarGraphColors,
} from "@/components/VisualEditor/elements/BarGraphAllocatedTotals"
import { fromCents } from "@/lib/money"

const defaultColors: BarGraphColors = {
	barColor: "#1B2A4A",
	fundedBarColor: "#7CFF2B",
	textColor: "#FFFFFF",
	needColor: "#7CFF2B",
	gridColor: "#FFFFFF",
}

function renderBarGraph(props: {
	totals: AllocatedTotalEntry[]
	colors?: BarGraphColors
	awardImageSrc?: string
}) {
	return render(
		<MantineProvider>
			<BarGraphAllocatedTotals
				colors={ defaultColors }
				{ ...props }
			/>
		</MantineProvider>,
	)
}

describe("components/VisualEditor/elements/BarGraphAllocatedTotals", () => {
	test("renders vertical bars with org labels and remaining need", () => {
		const totals: AllocatedTotalEntry[] = [
			{
				orgId: "org-1",
				orgName: "Alpha Org",
				allocated: fromCents(50_000, "USD"),
				need: fromCents(100_000, "USD"),
			},
			{
				orgId: "org-2",
				orgName: "Beta Org",
				allocated: fromCents(25_000, "USD"),
				need: fromCents(100_000, "USD"),
			},
		]

		renderBarGraph({ totals })

		expect(screen.getByText("Alpha Org")).toBeTruthy()
		expect(screen.getByText("Beta Org")).toBeTruthy()
		expect(screen.getByText("$500")).toBeTruthy()
		expect(screen.getByText("$250")).toBeTruthy()
		expect(screen.getByText("Need: $500")).toBeTruthy()
		expect(screen.getByText("Need: $750")).toBeTruthy()
		expect(screen.getByText("100%")).toBeTruthy()
		expect(screen.getByText("0%")).toBeTruthy()
	})

	test("shows award image only when funded and image is provided", () => {
		const funded: AllocatedTotalEntry = {
			orgId: "org-1",
			orgName: "Funded Org",
			allocated: fromCents(100_000, "USD"),
			need: fromCents(100_000, "USD"),
		}

		const { container, rerender } = renderBarGraph({
			totals: [funded],
			awardImageSrc: "https://example.com/award.png",
		})

		expect(container.querySelector("img[src='https://example.com/award.png']")).toBeTruthy()
		expect(screen.getByText("Need: --")).toBeTruthy()

		rerender(
			<MantineProvider>
				<BarGraphAllocatedTotals
					totals={ [funded] }
					colors={ defaultColors }
				/>
			</MantineProvider>,
		)

		expect(container.querySelector("img")).toBeNull()
	})
})

describe("components/VisualEditor/puck.config elements category", () => {
	test("includes Elements category with bar graph component", async () => {
		const { config } = await import("@/components/VisualEditor/puck.config")

		expect(config.categories?.elements?.title).toBe("Elements")
		expect(config.categories?.elements?.components).toEqual([
			"BarGraphAllocatedTotals",
			"LeverageBar",
			"Timer",
		])
		expect(config.components?.BarGraphAllocatedTotals).toBeDefined()
	}, 35000)
})
