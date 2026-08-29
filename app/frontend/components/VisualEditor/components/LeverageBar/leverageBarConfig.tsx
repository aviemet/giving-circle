import { type ComponentConfig, type PuckContext } from "@puckeditor/core"
import clsx from "clsx"

import { Box } from "@/components"
import { useLeverageTotals } from "@/features/presentation"
import { type CurrencyFormatMode } from "@/lib/formatters"
import { i18n } from "@/lib/i18n"

import * as classes from "./LeverageBar.css"
import { LeverageBar } from "../../elements/LeverageBar"
import {
	buildLeverageBarSizeStyle,
	currencyFormatField,
	defaultLeverageBarSize,
	defaultLeverageColors,
	defaultTextFontValue,
	leverageBarSizeField,
	leverageColorsField,
	normalizeLeverageColors,
	resolveLeverageBarSize,
	textFontField,
	type FlexItemSizing,
	type LeverageBarSizeValue,
	type LeverageColorsValue,
	type TextFontValue,
} from "../../fields"

export type LeverageBarProps = {
	colors?: LeverageColorsValue
	remainingColor?: string
	trackColor?: string
	borderRadius?: number
	font?: TextFontValue
	currencyFormat: CurrencyFormatMode
	size?: LeverageBarSizeValue
	sizing?: FlexItemSizing
}

type LeverageBarComponentProps = LeverageBarProps & {
	puck: PuckContext
}

function LeverageBarDisplay({
	colors,
	remainingColor,
	trackColor,
	borderRadius,
	font,
	currencyFormat,
	size,
	sizing,
	puck,
}: LeverageBarComponentProps) {
	const totals = useLeverageTotals()
	const resolvedColors = normalizeLeverageColors(colors, {
		remainingColor,
		trackColor,
		borderRadius,
	})
	const resolvedSize = resolveLeverageBarSize({ size, sizing })
	const { dragRef } = puck

	return (
		<Box
			ref={ dragRef }
			className={ clsx(classes.host) }
			style={ buildLeverageBarSizeStyle(resolvedSize) }
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
			label: t("slides.editor.components.leverage_bar.currency_format"),
		}),
	},
	defaultProps: {
		size: defaultLeverageBarSize(),
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
				size: resolveLeverageBarSize(props),
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
