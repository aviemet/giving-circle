import { i18n } from "@/lib/i18n"

import { optionalColorField } from "../color"

function borderText(key: string) {
	return i18n.t(`slides.editor.fields.border.${key}`)
}

export function borderWidthField() {
	return { type: "number" as const, label: borderText("width") }
}

export function borderRadiusField() {
	return { type: "number" as const, label: borderText("radius") }
}

export function borderColorField() {
	return optionalColorField({ label: borderText("color") })
}
