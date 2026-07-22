import { type TFunction } from "i18next"

import { i18n } from "@/lib/i18n"

function dimensionText(t: TFunction, key: string) {
	return t(`slides.editor.fields.dimension.${key}`)
}

export function widthField(t: TFunction = i18n.t.bind(i18n)) {
	return { type: "text" as const, label: dimensionText(t, "width") }
}

export function minWidthField(t: TFunction = i18n.t.bind(i18n)) {
	return { type: "text" as const, label: dimensionText(t, "min_width") }
}

export function minHeightField(t: TFunction = i18n.t.bind(i18n)) {
	return { type: "text" as const, label: dimensionText(t, "min_height") }
}
