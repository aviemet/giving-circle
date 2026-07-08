import { type TFunction } from "i18next"

import { i18n } from "@/lib/i18n"

import { optionalColorField } from "./color"

function colorText(t: TFunction, key: string) {
	return t(`slides.editor.fields.color.${key}`)
}

export function backgroundColorField(t: TFunction = i18n.t.bind(i18n)) {
	return optionalColorField({ label: colorText(t, "background") })
}
