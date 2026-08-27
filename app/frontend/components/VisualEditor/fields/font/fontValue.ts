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

const BLOB_REDIRECT_SIGNED_ID = /\/rails\/active_storage\/blobs\/redirect\/([^/]+)\//

export function signedIdFromFontUrl(url: string): string | undefined {
	const match = url.match(BLOB_REDIRECT_SIGNED_ID)
	if(match === null) {
		return undefined
	}

	return match[1]
}

export function matchingCircleFont(
	fonts: readonly Schema.CirclesFont[],
	font: FontValue,
): Schema.CirclesFont | undefined {
	if(!hasCustomFont(font)) {
		return undefined
	}

	const signedId = signedIdFromFontUrl(font.url)
	if(signedId !== undefined) {
		const bySignedId = fonts.find((candidate) => candidate.signed_id === signedId)
		if(bySignedId !== undefined) {
			return bySignedId
		}
	}

	const byUrl = fonts.find((candidate) => candidate.url === font.url)
	if(byUrl !== undefined) {
		return byUrl
	}

	return fonts.find((candidate) => candidate.family === font.family)
}
