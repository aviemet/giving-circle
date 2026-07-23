import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"

import {
	componentFontFamilyCss,
	defaultFontValue,
	fontFamilyCss,
	fontField,
	GENERIC_FONT_FAMILIES,
	hasCustomFont,
	hasFontFamily,
	isGenericFontFamily,
} from "@/components/VisualEditor/fields/font"
import { config } from "@/components/VisualEditor/puck.config"
import { SlideFontFace } from "@/components/VisualEditor/SlideFontFace"

describe("components/VisualEditor/fields/font", () => {
	test("fontField is a custom field labeled Font", () => {
		const field = fontField()
		expect(field).toMatchObject({ type: "custom", label: "Font" })
	})

	test("defaultFontValue is empty inherit/system default", () => {
		expect(defaultFontValue()).toEqual({ family: "", url: "" })
		expect(hasCustomFont(defaultFontValue())).toBe(false)
		expect(hasFontFamily(defaultFontValue())).toBe(false)
		expect(hasCustomFont({ family: "Brand", url: "/fonts/brand.woff2" })).toBe(true)
		expect(hasFontFamily({ family: "Brand", url: "/fonts/brand.woff2" })).toBe(true)
	})

	test("generic CSS families apply without a custom font URL", () => {
		expect(GENERIC_FONT_FAMILIES).toEqual([
			"serif",
			"sans-serif",
			"monospace",
			"cursive",
			"fantasy",
		])
		expect(isGenericFontFamily("serif")).toBe(true)
		expect(isGenericFontFamily("Comic Sans")).toBe(false)
		expect(hasCustomFont({ family: "serif", url: "" })).toBe(false)
		expect(hasFontFamily({ family: "serif", url: "" })).toBe(true)
		expect(fontFamilyCss({ family: "serif", url: "" })).toBe("serif")
		expect(fontFamilyCss({ family: "Brand", url: "/fonts/brand.woff2" })).toBe("\"Brand\", sans-serif")
		expect(fontFamilyCss(defaultFontValue())).toBeUndefined()
		expect(componentFontFamilyCss(defaultFontValue())).toBe("inherit")
		expect(componentFontFamilyCss({ family: "monospace", url: "" })).toBe("monospace")
	})
})

describe("components/VisualEditor/puck.config root font", () => {
	test("root exposes font field and default", () => {
		expect(config.root?.fields?.font).toMatchObject({ type: "custom", label: "Font" })
		expect(config.root?.defaultProps).toMatchObject({
			font: { family: "", url: "" },
		})
	})
})

describe("components/VisualEditor/SlideFontFace", () => {
	test("renders @font-face when a custom font is set", () => {
		const markup = renderToStaticMarkup(
			<SlideFontFace font={ { family: "Brand Sans", url: "/rails/active_storage/blobs/redirect/abc/Brand.woff2" } } />,
		)

		expect(markup).toContain("@font-face")
		expect(markup).toContain("Brand Sans")
		expect(markup).toContain("format(\"woff2\")")
	})

	test("renders nothing for inherit/default fonts", () => {
		const markup = renderToStaticMarkup(<SlideFontFace font={ defaultFontValue() } />)
		expect(markup).toBe("")
	})

	test("renders nothing for CSS generic families", () => {
		const markup = renderToStaticMarkup(<SlideFontFace font={ { family: "monospace", url: "" } } />)
		expect(markup).toBe("")
	})
})
