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
	legacy?: Partial<TypeStyleValue>,
	fallbackWeight: FontWeightValue = 400,
): TypeStyleValue {
	const defaults = defaultTypeStyle(fallbackWeight)
	return {
		fw: value?.fw ?? legacy?.fw ?? defaults.fw,
		td: value?.td ?? legacy?.td ?? defaults.td,
		tt: value?.tt ?? legacy?.tt ?? defaults.tt,
		fs: value?.fs ?? legacy?.fs ?? defaults.fs,
	}
}
