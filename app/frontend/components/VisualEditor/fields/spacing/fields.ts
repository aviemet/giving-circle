import { i18n } from "@/lib/i18n"

import { spacingField } from "./spacing"

function spacingText(key: string) {
	return i18n.t(`slides.editor.fields.spacing.${key}`)
}

export function marginField() {
	return spacingField({ label: spacingText("margin") })
}

export function paddingField() {
	return spacingField({ label: spacingText("padding") })
}
