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
	matchingCircleFont,
	signedIdFromFontUrl,
} from "@/components/VisualEditor/fields/font"
import {
	CUSTOM_FONT_SELECT_PREFIX,
	fontSelectOptions,
	fontSelectValue,
	fontValueFromSelect,
} from "@/components/VisualEditor/fields/font/fontSelect"
import { config } from "@/components/VisualEditor/puck.config"
import { headingConfig } from "@/components/VisualEditor/components/Heading"
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

const brandFont: Schema.CirclesFont = {
	family: "Brand Sans",
	filename: "Brand Sans.woff2",
	signed_id: "signed-brand",
	url: "/rails/active_storage/blobs/redirect/signed-brand/Brand%20Sans.woff2",
}

const genericLabels = {
	serif: "Serif",
	"sans-serif": "Sans serif",
	monospace: "Monospace",
	cursive: "Cursive",
	fantasy: "Fantasy",
}

describe("components/VisualEditor/fields/font select", () => {
	test("matches an uploaded circle font by blob signed id even when the URL encoding differs", () => {
		expect(signedIdFromFontUrl(brandFont.url)).toBe("signed-brand")
		expect(matchingCircleFont([brandFont], {
			family: "Brand Sans",
			url: "/rails/active_storage/blobs/redirect/signed-brand/Brand Sans.woff2",
		})).toEqual(brandFont)
	})

	test("lists uploaded circle fonts for the heading picker and selects them by signed id", () => {
		const options = fontSelectOptions(
			[brandFont],
			defaultFontValue(),
			genericLabels,
			"Inherit",
		)

		expect(options).toContainEqual({ value: "", label: "Inherit" })
		expect(options).toContainEqual({ value: "signed-brand", label: "Brand Sans" })
		expect(fontSelectValue({
			family: "Brand Sans",
			url: brandFont.url,
		}, [brandFont])).toBe("signed-brand")
		expect(fontValueFromSelect("signed-brand", [brandFont], defaultFontValue())).toEqual({
			family: "Brand Sans",
			url: brandFont.url,
		})
	})

	test("keeps an unmatched custom font selectable instead of falling back to inherit", () => {
		const current = { family: "Orphan", url: "/fonts/orphan.woff2" }
		const selected = fontSelectValue(current, [])
		expect(selected).toBe(`${CUSTOM_FONT_SELECT_PREFIX}/fonts/orphan.woff2`)
		expect(fontSelectOptions([], current, genericLabels, "Inherit")).toContainEqual({
			value: selected,
			label: "Orphan",
		})
	})
})

describe("components/VisualEditor/heading inherit", () => {
	test("heading defaults to an empty font so it inherits the page family", () => {
		expect(headingConfig.defaultProps?.font).toMatchObject({
			family: "",
			url: "",
		})
		expect(componentFontFamilyCss(headingConfig.defaultProps?.font)).toBe("inherit")
	})
})
