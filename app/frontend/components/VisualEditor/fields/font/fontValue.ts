export interface FontValue {
	family: string
	url: string
}

export const GENERIC_FONT_FAMILIES = [
	"serif",
	"sans-serif",
	"monospace",
	"cursive",
	"fantasy",
] as const

export type GenericFontFamily = typeof GENERIC_FONT_FAMILIES[number]

export function defaultFontValue(): FontValue {
	return {
		family: "",
		url: "",
	}
}

export function isGenericFontFamily(family: string): family is GenericFontFamily {
	return (GENERIC_FONT_FAMILIES as readonly string[]).includes(family)
}

export function hasFontFamily(font: FontValue | undefined): font is FontValue {
	if(font === undefined) {
		return false
	}

	return font.family.length > 0
}

export function hasCustomFont(font: FontValue | undefined): font is FontValue {
	if(font === undefined) {
		return false
	}

	return font.family.length > 0 && font.url.length > 0
}

export function fontFamilyCss(font: FontValue | undefined): string | undefined {
	if(!hasFontFamily(font)) {
		return undefined
	}

	if(font.url.length > 0) {
		return `"${font.family}", sans-serif`
	}

	return font.family
}

export function componentFontFamilyCss(font: FontValue | undefined): string {
	return fontFamilyCss(font) ?? "inherit"
}
