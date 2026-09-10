import {
	defaultFlexibleFontSize,
	normalizeFlexibleFontSize,
	type FlexibleFontSize,
	type FontSizePreset,
} from "./fontSize"
import { defaultFontValue, type FontValue } from "./fontValue"

export type TextFontValue = FontValue & {
	color: string
	size: FlexibleFontSize
}

export function defaultTextFontValue(params: {
	color?: string
	sizePreset?: FontSizePreset
} = {}): TextFontValue {
	return {
		...defaultFontValue(),
		color: params.color ?? "#FFFFFF",
		size: defaultFlexibleFontSize(params.sizePreset ?? "md"),
	}
}

export function normalizeTextFontValue(
	value: Partial<TextFontValue> | undefined,
	fallback?: {
		color?: string
		sizePreset?: FontSizePreset
	},
): TextFontValue {
	const defaults = defaultTextFontValue({
		color: fallback?.color,
		sizePreset: fallback?.sizePreset,
	})

	return {
		family: value?.family ?? defaults.family,
		url: value?.url ?? defaults.url,
		color: value?.color ?? defaults.color,
		size: normalizeFlexibleFontSize(value?.size, defaults.size),
	}
}
