import { type TFunction } from "i18next"

import { i18n } from "@/lib/i18n"

import { optionalColorField } from "../color"

function borderText(t: TFunction, key: string) {
	return t(`slides.editor.fields.border.${key}`)
}

export function borderWidthField(t: TFunction = i18n.t.bind(i18n)) {
	return { type: "number" as const, label: borderText(t, "width") }
}

export function borderRadiusField(t: TFunction = i18n.t.bind(i18n)) {
	return { type: "number" as const, label: borderText(t, "radius") }
}

export function borderColorField(t: TFunction = i18n.t.bind(i18n)) {
	return optionalColorField({ label: borderText(t, "color") })
}
