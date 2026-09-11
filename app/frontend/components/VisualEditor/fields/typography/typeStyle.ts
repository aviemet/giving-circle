import {
	type FontStyleValue,
	type FontWeightValue,
	type TextDecorationValue,
	type TextTransformValue,
} from "./fields"

export type TypeStyleValue = {
	fw: FontWeightValue
	td: TextDecorationValue
	tt: TextTransformValue
	fs: FontStyleValue
}

export function defaultTypeStyle(fw: FontWeightValue = 400): TypeStyleValue {
	return {
		fw,
		td: "none",
		tt: "none",
		fs: "normal",
	}
}

export function normalizeTypeStyle(
	value: Partial<TypeStyleValue> | undefined,
	fallbackWeight: FontWeightValue = 400,
): TypeStyleValue {
	return { ...defaultTypeStyle(fallbackWeight), ...value }
}
