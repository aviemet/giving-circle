import { hasCustomFont, type FontValue } from "./fields/font"

function fontFormatFromUrl(url: string) {
	const path = url.split("?")[0] ?? url
	const extension = path.split(".").pop()?.toLowerCase()

	if(extension === "woff2") {
		return "woff2"
	}
	if(extension === "woff") {
		return "woff"
	}
	if(extension === "ttf") {
		return "truetype"
	}
	if(extension === "otf") {
		return "opentype"
	}

	return undefined
}

export function SlideFontFace({ font }: { font: FontValue | undefined }) {
	if(!hasCustomFont(font) || font === undefined) {
		return null
	}

	const format = fontFormatFromUrl(font.url)
	let src = `url("${font.url}")`
	if(format !== undefined) {
		src = `url("${font.url}") format("${format}")`
	}

	return (
		<style>
			{ `@font-face { font-family: "${font.family}"; src: ${src}; font-display: swap; }` }
		</style>
	)
}
