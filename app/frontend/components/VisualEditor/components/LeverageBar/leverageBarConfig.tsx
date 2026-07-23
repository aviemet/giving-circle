import { type ComponentConfig } from "@puckeditor/core"
import clsx from "clsx"

import { Box } from "@/components"
import { useLeverageTotals } from "@/features/presentation"
import { type CurrencyFormatMode } from "@/lib/formatters"
import { i18n } from "@/lib/i18n"

import * as classes from "./LeverageBar.css"
import { LeverageBar } from "../../elements/LeverageBar"
import * as elementClasses from "../../elements/LeverageBar/LeverageBar.css"
import {
	currencyFormatField,
	defaultLeverageColors,
	defaultTextFontValue,
	flexItemSizingField,
	leverageColorsField,
	normalizeLeverageColors,
	textFontField,
	type FlexItemSizing,
	type LeverageColorsValue,
	type TextFontValue,
} from "../../fields"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"

export type LeverageBarProps = {
	colors?: LeverageColorsValue
	remainingColor?: string
	trackColor?: string
	borderRadius?: number
	font?: TextFontValue
	currencyFormat: CurrencyFormatMode
	sizing?: FlexItemSizing
}

function LeverageBarDisplay({
	colors,
	remainingColor,
	trackColor,
	borderRadius,
	font,
	currencyFormat,
	sizing,
}: LeverageBarProps) {
	const totals = useLeverageTotals()
	const resolvedColors = normalizeLeverageColors(colors, {
		remainingColor,
		trackColor,
		borderRadius,
	})

	return (
		<Box
			className={ clsx(classes.host, elementClasses.host) }
			style={ buildFlexItemSizingStyle(sizing ?? { mode: "fill" }) }
		>
			<LeverageBar
				totals={ totals }
				colors={ resolvedColors }
				font={ font }
				currencyFormat={ currencyFormat }
			/>
		</Box>
	)
}

const t = i18n.t.bind(i18n)

export const leverageBarConfig: ComponentConfig<LeverageBarProps> = {
	label: t("slides.editor.components.leverage_bar.label"),
	fields: {
		sizing: flexItemSizingField(),
		colors: leverageColorsField(),
		font: textFontField({
			allowInherit: false,
			allowAutoSize: false,
			fallbackColor: "#FFFFFF",
			fallbackSizePreset: "xl",
		}),
		currencyFormat: currencyFormatField({
			label: t("slides.editor.components.leverage_bar.currency_format"),
		}),
	},
	defaultProps: {
		sizing: {
			mode: "fill",
			height: { amount: 36, unit: "px" },
		},
		colors: defaultLeverageColors(),
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
				colors: normalizeLeverageColors(props.colors, {
					remainingColor: props.remainingColor,
					trackColor: props.trackColor,
					borderRadius: props.borderRadius,
				}),
			},
		}
	},
	render: (props) => <LeverageBarDisplay { ...props } />,
}
