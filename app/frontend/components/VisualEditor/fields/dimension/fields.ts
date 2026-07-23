import { i18n } from "@/lib/i18n"

function dimensionText(key: string) {
	return i18n.t(`slides.editor.fields.dimension.${key}`)
}

export function widthField() {
	return { type: "text" as const, label: dimensionText("width") }
}

export function minWidthField() {
	return { type: "text" as const, label: dimensionText("min_width") }
}

export function minHeightField() {
	return { type: "text" as const, label: dimensionText("min_height") }
}
