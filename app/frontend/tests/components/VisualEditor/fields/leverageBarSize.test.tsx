import { type CustomField } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import {
	buildLeverageBarSizeStyle,
	defaultLeverageBarSize,
	leverageBarSizeField,
	LEVERAGE_BAR_HEIGHT_UNITS,
	LEVERAGE_BAR_WIDTH_UNITS,
	normalizeLeverageBarSize,
	resolveLeverageBarSize,
	type LeverageBarSizeValue,
} from "@/components/VisualEditor/fields/leverageBarSize"
import { i18n } from "@/lib/i18n"
import { render } from "@/tests/helpers/utils"

function renderSizeField(value: LeverageBarSizeValue = defaultLeverageBarSize()) {
	const field = leverageBarSizeField()
	if(field.type !== "custom") {
		throw new Error("leverageBarSizeField must be a custom field")
	}

	const customField: CustomField<LeverageBarSizeValue | undefined> = field
	const onChange = vi.fn()

	render(
		customField.render({
			field: customField,
			name: "size",
			id: "size",
			value,
			onChange,
		}),
	)

	return onChange
}

describe("components/VisualEditor/fields/leverageBarSize", () => {
	test("defaults to full parent width and an explicit bar height", () => {
		expect(defaultLeverageBarSize()).toEqual({
			width: { amount: 100, unit: "%" },
			height: { amount: 36, unit: "px" },
		})
		expect(LEVERAGE_BAR_WIDTH_UNITS).toEqual(["px", "%", "rem", "vw"])
		expect(LEVERAGE_BAR_HEIGHT_UNITS).toEqual(["px", "rem", "em"])
		expect(LEVERAGE_BAR_HEIGHT_UNITS).not.toContain("%")
	})

	test("normalize fills missing axes from defaults", () => {
		expect(normalizeLeverageBarSize({
			width: { amount: 80, unit: "%" },
		})).toEqual({
			width: { amount: 80, unit: "%" },
			height: { amount: 36, unit: "px" },
		})
	})

	test("style hugs an explicit size instead of filling leftover flex space", () => {
		expect(buildLeverageBarSizeStyle({
			width: { amount: 80, unit: "%" },
			height: { amount: 48, unit: "px" },
		})).toEqual({
			width: "80%",
			height: "48px",
			maxWidth: "100%",
			flexGrow: 0,
			flexShrink: 0,
			minHeight: "48px",
		})
	})

	test("resolve hydrates legacy flex-item height into the dedicated size field", () => {
		expect(resolveLeverageBarSize({
			sizing: {
				mode: "fill",
				height: { amount: 28, unit: "px" },
			},
		})).toEqual({
			width: { amount: 100, unit: "%" },
			height: { amount: 28, unit: "px" },
		})
	})

	test("resolve prefers the dedicated size field over leftover sizing", () => {
		expect(resolveLeverageBarSize({
			size: {
				width: { amount: 240, unit: "px" },
				height: { amount: 20, unit: "px" },
			},
			sizing: {
				mode: "fill",
				height: { amount: 36, unit: "px" },
			},
		})).toEqual({
			width: { amount: 240, unit: "px" },
			height: { amount: 20, unit: "px" },
		})
	})

	test("Size panel exposes width and height controls", () => {
		expect(leverageBarSizeField().label).toBe("Size")
		expect(i18n.t("slides.editor.fields.leverage_bar_size.labels.width")).toBe("Width")
		expect(i18n.t("slides.editor.fields.leverage_bar_size.labels.height")).toBe("Height")

		renderSizeField()

		expect(screen.getByText("Width")).toBeInTheDocument()
		expect(screen.getByText("Height")).toBeInTheDocument()
		expect(screen.getByDisplayValue("100")).toBeInTheDocument()
		expect(screen.getByDisplayValue("36")).toBeInTheDocument()
	})
})
