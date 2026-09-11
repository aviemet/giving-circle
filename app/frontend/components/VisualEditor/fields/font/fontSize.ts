import { type HeadingOrder } from "../headingMetrics"

export type FontSizeMode = "preset" | "custom" | "clamp"

export type FontSizePreset =
	| "auto"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"

export type FlexibleFontSize = {
	mode: FontSizeMode
	preset: FontSizePreset
	custom: string
	clampMin: string
	clampPreferred: string
	clampMax: string
}

export const HEADING_LEVEL_FONT_SIZE = {
	1: "4.25rem",
	2: "3.25rem",
	3: "2.5rem",
	4: "2rem",
	5: "1.5rem",
	6: "1.25rem",
} as const satisfies Record<HeadingOrder, string>

const HEADING_PRESET_ORDER = {
	h1: 1,
	h2: 2,
	h3: 3,
	h4: 4,
	h5: 5,
	h6: 6,
} as const satisfies Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", HeadingOrder>

const DISPLAY_PRESET_CSS: Record<"2xl" | "3xl" | "4xl" | "5xl" | "6xl", string> = {
	"2xl": "2.25rem",
	"3xl": "3rem",
	"4xl": "4.5rem",
	"5xl": "6rem",
	"6xl": "8rem",
}

const MANTINE_PRESETS = new Set(["xs", "sm", "md", "lg", "xl"])

const DISPLAY_PRESETS = new Set(["2xl", "3xl", "4xl", "5xl", "6xl"])

export function defaultFlexibleFontSize(preset: FontSizePreset = "md"): FlexibleFontSize {
	return {
		mode: "preset",
		preset,
		custom: "",
		clampMin: "1rem",
		clampPreferred: "5vw",
		clampMax: "3rem",
	}
}

function isFontSizeMode(value: string): value is FontSizeMode {
	return value === "preset" || value === "custom" || value === "clamp"
}

function isFontSizePreset(value: string): value is FontSizePreset {
	return value === "auto"
		|| value === "xs"
		|| value === "sm"
		|| value === "md"
		|| value === "lg"
		|| value === "xl"
		|| value === "2xl"
		|| value === "3xl"
		|| value === "4xl"
		|| value === "5xl"
		|| value === "6xl"
		|| value === "h1"
		|| value === "h2"
		|| value === "h3"
		|| value === "h4"
		|| value === "h5"
		|| value === "h6"
}

function isHeadingSizePreset(value: string): value is keyof typeof HEADING_PRESET_ORDER {
	return value === "h1"
		|| value === "h2"
		|| value === "h3"
		|| value === "h4"
		|| value === "h5"
		|| value === "h6"
}

function isDisplayPreset(value: string): value is keyof typeof DISPLAY_PRESET_CSS {
	return DISPLAY_PRESETS.has(value)
}

export function isFontSizeModeValue(value: string): value is FontSizeMode {
	return isFontSizeMode(value)
}

export function isFontSizePresetValue(value: string): value is FontSizePreset {
	return isFontSizePreset(value)
}

export function isHeadingSizePresetValue(value: string): value is keyof typeof HEADING_PRESET_ORDER {
	return isHeadingSizePreset(value)
}

export function normalizeFlexibleFontSize(
	value: Partial<FlexibleFontSize> | undefined,
	fallback: FlexibleFontSize = defaultFlexibleFontSize(),
): FlexibleFontSize {
	if(value === undefined) {
		return fallback
	}

	return {
		mode: value.mode !== undefined && isFontSizeMode(value.mode) ? value.mode : fallback.mode,
		preset: value.preset !== undefined && isFontSizePreset(value.preset)
			? value.preset
			: fallback.preset,
		custom: value.custom ?? fallback.custom,
		clampMin: value.clampMin ?? fallback.clampMin,
		clampPreferred: value.clampPreferred ?? fallback.clampPreferred,
		clampMax: value.clampMax ?? fallback.clampMax,
	}
}

export type ResolvedFontSize = {
	mantineSize?: string
	fontSize?: string
}

export function resolveFontSize(
	size: FlexibleFontSize,
	headingOrder?: HeadingOrder,
): ResolvedFontSize {
	if(size.mode === "custom") {
		const custom = size.custom.trim()
		if(custom.length === 0) {
			return {}
		}
		return { fontSize: custom }
	}

	if(size.mode === "clamp") {
		const min = size.clampMin.trim() || "1rem"
		const preferred = size.clampPreferred.trim() || "5vw"
		const max = size.clampMax.trim() || "3rem"
		return { fontSize: `clamp(${min}, ${preferred}, ${max})` }
	}

	if(size.preset === "auto") {
		if(headingOrder === undefined) {
			return {}
		}
		return { fontSize: HEADING_LEVEL_FONT_SIZE[headingOrder] }
	}

	if(isHeadingSizePreset(size.preset)) {
		return { fontSize: HEADING_LEVEL_FONT_SIZE[HEADING_PRESET_ORDER[size.preset]] }
	}

	if(isDisplayPreset(size.preset)) {
		return { fontSize: DISPLAY_PRESET_CSS[size.preset] }
	}

	if(MANTINE_PRESETS.has(size.preset)) {
		return { mantineSize: size.preset }
	}

	return {}
}
