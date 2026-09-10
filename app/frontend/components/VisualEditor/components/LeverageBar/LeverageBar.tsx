import { type PuckComponent } from "@puckeditor/core"

import { type CurrencyFormatMode } from "@/lib/formatters"

import { LeverageBarDisplay } from "./LeverageBarDisplay"
import { LeverageBarEditor } from "./LeverageBarEditor"
import {
	type LeverageBarSizeValue,
	type LeverageColorsValue,
	type TextFontValue,
} from "../../fields"

export type LeverageBarProps = {
	colors?: LeverageColorsValue
	font?: TextFontValue
	currencyFormat: CurrencyFormatMode
	size?: LeverageBarSizeValue
}

export type LeverageBarComponentProps = Parameters<PuckComponent<LeverageBarProps>>[0]

export function LeverageBar(props: LeverageBarComponentProps) {
	return props.puck.isEditing
		? <LeverageBarEditor { ...props } />
		: <LeverageBarDisplay { ...props } />
}
