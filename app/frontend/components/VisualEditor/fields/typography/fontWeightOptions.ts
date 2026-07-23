import { type TFunction } from "i18next"

export type FontWeightValue = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export const FONT_WEIGHTS: FontWeightValue[] = [100, 200, 300, 400, 500, 600, 700, 800, 900]

function isFontWeightValue(value: string): value is `${FontWeightValue}` {
	return FONT_WEIGHTS.some((weight) => String(weight) === value)
}

export function parseFontWeight(value: string): FontWeightValue | undefined {
	if(!isFontWeightValue(value)) {
		return undefined
	}
	const numericValue = Number(value)
	if(
		numericValue === 100
		|| numericValue === 200
		|| numericValue === 300
		|| numericValue === 400
		|| numericValue === 500
		|| numericValue === 600
		|| numericValue === 700
		|| numericValue === 800
		|| numericValue === 900
	) {
		return numericValue
	}
	return undefined
}

export function fontWeightSelectOptions(t: TFunction) {
	return FONT_WEIGHTS.map((weight) => ({
		value: String(weight),
		label: t(`slides.editor.fields.typography.weights.${weight}`),
	}))
}
