import { type Field } from "@puckeditor/core"

import { CurrencyFormatMode } from "@/lib/formatters"
import { i18n } from "@/lib/i18n"

export function currencyFormatField(params: {
	label?: string
} = {}): Field<CurrencyFormatMode> {
	const label = params.label ?? i18n.t("slides.editor.fields.currency_format.label")

	return {
		type: "select",
		label,
		options: [
			{
				label: i18n.t("slides.editor.fields.currency_format.options.whole"),
				value: "whole",
			},
			{
				label: i18n.t("slides.editor.fields.currency_format.options.compact"),
				value: "compact",
			},
			{
				label: i18n.t("slides.editor.fields.currency_format.options.format"),
				value: "format",
			},
		],
	}
}
