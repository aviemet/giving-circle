import { i18n } from "@/lib/i18n"

import { optionalColorField } from "./color"

function colorText(key: string) {
	return i18n.t(`slides.editor.fields.color.${key}`)
}

export function backgroundColorField() {
	return optionalColorField({ label: colorText("background") })
}
