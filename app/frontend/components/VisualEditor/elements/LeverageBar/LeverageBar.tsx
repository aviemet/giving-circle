import clsx from "clsx"
import { type CSSProperties } from "react"

import { Box, Text } from "@/components"
import {
	leverageFilledPercent,
	type LeverageTotals,
} from "@/features/presentation"
import { currency, type CurrencyFormatMode } from "@/lib/formatters"

import * as classes from "./LeverageBar.css"
import {
	componentFontFamilyCss,
	normalizeTextFontValue,
	resolveFontSize,
	type LeverageColorsValue,
	type TextFontValue,
} from "../../fields"
import { SlideFontFace } from "../../SlideFontFace"

export type LeverageBarColors = Pick<LeverageColorsValue, "remainingColor" | "trackColor"> & {
	borderRadius?: number
}

export interface LeverageBarProps {
	totals: LeverageTotals
	colors: LeverageBarColors
	font?: TextFontValue
	currencyFormat?: CurrencyFormatMode
}

function formatRemaining(totals: LeverageTotals, mode: CurrencyFormatMode = "whole") {
	return currency[mode](totals.remaining)
}

export function LeverageBar({
	totals,
	colors,
	font,
	currencyFormat = "compact",
}: LeverageBarProps) {
	const resolvedFont = normalizeTextFontValue(font, undefined, {
		color: "#FFFFFF",
		sizePreset: "xl",
	})
	const resolvedSize = resolveFontSize(resolvedFont.size)
	const filledPercent = leverageFilledPercent(totals)
	const borderRadius = colors.borderRadius ?? 0
	const labelStyle: CSSProperties = {
		color: resolvedFont.color.length > 0 ? resolvedFont.color : "#FFFFFF",
		fontFamily: componentFontFamilyCss(resolvedFont),
	}

	if(resolvedSize.fontSize !== undefined) {
		labelStyle.fontSize = resolvedSize.fontSize
	}

	return (
		<>
			<SlideFontFace font={ resolvedFont } />
			<Box
				className={ clsx(classes.root) }
				style={ { borderRadius } }
			>
				<Box
					className={ clsx(classes.track) }
					style={ { backgroundColor: colors.trackColor } }
				/>
				<Box
					className={ clsx(classes.remaining) }
					style={ {
						backgroundColor: colors.remainingColor,
						width: `${filledPercent}%`,
					} }
				/>
				<Text
					className={ clsx(classes.label) }
					style={ labelStyle }
					size={ resolvedSize.mantineSize }
					ff={ componentFontFamilyCss(resolvedFont) }
					c={ resolvedFont.color.length > 0 ? resolvedFont.color : undefined }
					fw={ 700 }
				>
					{ formatRemaining(totals, currencyFormat) }
				</Text>
			</Box>
		</>
	)
}
