import { describe, expect, test } from "vitest"

import { currencyFormatField } from "@/components/VisualEditor/fields/currencyFormat/currencyFormatField"
import {
	defaultFontValue,
	fontFamilyCss,
	hasCustomFont,
	hasFontFamily,
	isGenericFontFamily,
} from "@/components/VisualEditor/fields/font/fontValue"
import {
	applyImageScaleMode,
	buildImageSizeStyle,
	defaultImageSize,
	imageDimensionUnits,
	imageSizeUsesCropBox,
	isImageAspectRatio,
	isImageObjectFit,
	isImageScaleMode,
	normalizeImageSize,
	resolveAspectRatioCss,
	resolveImageSize,
} from "@/components/VisualEditor/fields/imageSize/imageSize"
import {
	alignMatrixCells,
	flexFromPhysicalAxes,
	justifySelectOptions,
	physicalAxesFromFlex,
	physicalAxisSelectOptions,
} from "@/components/VisualEditor/fields/shared/alignMatrixMapping"
import {
	FONT_WEIGHTS,
	fontWeightSelectOptions,
	parseFontWeight,
} from "@/components/VisualEditor/fields/typography/fontWeightOptions"
import { defaultTypeStyle, normalizeTypeStyle } from "@/components/VisualEditor/fields/typography/typeStyle"

describe("VisualEditor pure field helpers", () => {
	test("currencyFormatField", () => {
		expect(currencyFormatField().type).toBe("select")
		expect(currencyFormatField({ label: "Fmt" }).label).toBe("Fmt")
	})

	test("fontValue helpers", () => {
		expect(defaultFontValue()).toEqual({ family: "", url: "" })
		expect(isGenericFontFamily("serif")).toBe(true)
		expect(isGenericFontFamily("Comic")).toBe(false)
		expect(hasFontFamily(undefined)).toBe(false)
		expect(hasFontFamily({ family: "Arial", url: "" })).toBe(true)
		expect(hasCustomFont({ family: "Custom", url: "/f.woff" })).toBe(true)
		expect(fontFamilyCss({ family: "Custom", url: "/f.woff" })).toBe("\"Custom\", sans-serif")
		expect(fontFamilyCss({ family: "serif", url: "" })).toBe("serif")
	})

	test("imageSize helpers", () => {
		expect(imageDimensionUnits()).toContain("px")
		expect(isImageScaleMode("box")).toBe(true)
		expect(isImageScaleMode("nope")).toBe(false)
		expect(isImageAspectRatio("16 / 9")).toBe(true)
		expect(isImageObjectFit("cover")).toBe(true)
		const defaults = defaultImageSize()
		expect(defaults.mode).toBe("width")
		expect(normalizeImageSize({ mode: "natural" }).mode).toBe("natural")
		expect(applyImageScaleMode(defaults, "height").mode).toBe("height")
		expect(imageSizeUsesCropBox(defaults)).toBe(false)
		expect(resolveAspectRatioCss({ ...defaults, aspectRatio: "1 / 1" })).toBe("1 / 1")
		expect(buildImageSizeStyle(defaults).display).toBe("block")
		expect(resolveImageSize({ width: 100, height: 50 }).mode).toBe("box")
	})

	test("alignMatrixMapping", () => {
		expect(alignMatrixCells()).toHaveLength(9)
		expect(physicalAxesFromFlex({
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "flex-start",
		})).toEqual({ x: "center", y: "start" })
		expect(flexFromPhysicalAxes({
			flexDirection: "column",
			x: "end",
			y: "start",
		})).toEqual({
			justifyContent: "flex-start",
			alignItems: "flex-end",
		})
		expect(physicalAxisSelectOptions(true).some((option) => option.value === "stretch")).toBe(true)
		expect(justifySelectOptions().length).toBe(5)
	})

	test("typography helpers", () => {
		expect(FONT_WEIGHTS).toContain(400)
		expect(parseFontWeight("700")).toBe(700)
		expect(parseFontWeight("nope")).toBeUndefined()
		expect(fontWeightSelectOptions().length).toBe(FONT_WEIGHTS.length)
		expect(defaultTypeStyle(700).fw).toBe(700)
		expect(normalizeTypeStyle({ td: "underline" }, { fw: 600 }).fw).toBe(600)
	})
})
