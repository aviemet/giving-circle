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

const DISPLAY_PRESET_CSS: Record<"2xl" | "3xl" | "4xl", string> = {
	"2xl": "2.25rem",
	"3xl": "3rem",
	"4xl": "4.5rem",
}

const MANTINE_PRESETS = new Set([
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
])

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
		|| value === "h1"
		|| value === "h2"
		|| value === "h3"
		|| value === "h4"
		|| value === "h5"
		|| value === "h6"
}

export function isFontSizeModeValue(value: string): value is FontSizeMode {
	return isFontSizeMode(value)
}

export function isFontSizePresetValue(value: string): value is FontSizePreset {
	return isFontSizePreset(value)
}

export function normalizeFlexibleFontSize(
	value: Partial<FlexibleFontSize> | undefined,
	legacyPreset?: string,
): FlexibleFontSize {
	const defaults = defaultFlexibleFontSize(
		legacyPreset !== undefined && isFontSizePreset(legacyPreset) ? legacyPreset : "md",
	)

	if(value === undefined) {
		return defaults
	}

	return {
		mode: value.mode !== undefined && isFontSizeMode(value.mode) ? value.mode : defaults.mode,
		preset: value.preset !== undefined && isFontSizePreset(value.preset)
			? value.preset
			: defaults.preset,
		custom: value.custom ?? defaults.custom,
		clampMin: value.clampMin ?? defaults.clampMin,
		clampPreferred: value.clampPreferred ?? defaults.clampPreferred,
		clampMax: value.clampMax ?? defaults.clampMax,
	}
}

export type ResolvedFontSize = {
	mantineSize?: string
	fontSize?: string
}

export function resolveFontSize(size: FlexibleFontSize): ResolvedFontSize {
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
		return {}
	}

	if(size.preset === "2xl" || size.preset === "3xl" || size.preset === "4xl") {
		return { fontSize: DISPLAY_PRESET_CSS[size.preset] }
	}

	if(MANTINE_PRESETS.has(size.preset)) {
		return { mantineSize: size.preset }
	}

	return {}
}
