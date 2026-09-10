import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { LeverageBar, type LeverageBarProps } from "./LeverageBar"
import {
	currencyFormatField,
	defaultLeverageBarSize,
	defaultLeverageColors,
	defaultTextFontValue,
	leverageBarSizeField,
	leverageColorsField,
	normalizeLeverageBarSize,
	normalizeLeverageColors,
	textFontField,
} from "../../fields"

export const leverageBarConfig: ComponentConfig<LeverageBarProps> = {
	label: i18n.t("slides.editor.components.leverage_bar.label"),
	inline: true,

	fields: {
		size: leverageBarSizeField(),
		colors: leverageColorsField(),
		font: textFontField({
			allowInherit: false,
			allowAutoSize: false,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "xl",
		}),
		currencyFormat: currencyFormatField({
			label: i18n.t("slides.editor.components.leverage_bar.currency_format"),
		}),
	},

	defaultProps: {
		size: defaultLeverageBarSize(),
		colors: defaultLeverageColors,
		font: defaultTextFontValue({
			color: "#FFFFFF",
			sizePreset: "xl",
		}),
		currencyFormat: "compact",
	},

	resolveData: ({ props }) => {
		if(props === undefined) {
			return {}
		}

		return {
			props: {
				...props,
				size: normalizeLeverageBarSize(props.size),
				colors: normalizeLeverageColors(props.colors),
			},
		}
	},

	render: (props) => <LeverageBar { ...props } />,
}
