import { type TFunction } from "i18next"

import { i18n } from "@/lib/i18n"

import { spacingField } from "./spacing"

function spacingText(t: TFunction, key: string) {
	return t(`slides.editor.fields.spacing.${key}`)
}

export function marginField(t: TFunction = i18n.t.bind(i18n)) {
	return spacingField({ label: spacingText(t, "margin") })
}

export function paddingField(t: TFunction = i18n.t.bind(i18n)) {
	return spacingField({ label: spacingText(t, "padding") })
}
