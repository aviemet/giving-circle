import {
	defaultFontValue,
	GENERIC_FONT_FAMILIES,
	hasCustomFont,
	hasFontFamily,
	isGenericFontFamily,
	matchingCircleFont,
	type FontValue,
	type GenericFontFamily,
} from "./fontValue"

export const INHERIT_FONT_SELECT_VALUE = ""
export const CUSTOM_FONT_SELECT_PREFIX = "custom:"

export interface FontSelectOption {
	value: string
	label: string
}

export function customFontSelectValue(url: string): string {
	return `${CUSTOM_FONT_SELECT_PREFIX}${url}`
}

export function fontSelectValue(
	font: FontValue,
	fonts: readonly Schema.CirclesFont[],
): string {
	if(!hasFontFamily(font)) {
		return INHERIT_FONT_SELECT_VALUE
	}

	if(font.url.length === 0 && isGenericFontFamily(font.family)) {
		return font.family
	}

	const matched = matchingCircleFont(fonts, font)
	if(matched !== undefined) {
		return matched.signed_id
	}

	if(hasCustomFont(font)) {
		return customFontSelectValue(font.url)
	}

	return INHERIT_FONT_SELECT_VALUE
}

export function fontSelectOptions(
	fonts: readonly Schema.CirclesFont[],
	font: FontValue,
	genericLabels: Record<GenericFontFamily, string>,
	emptyLabel: string,
): FontSelectOption[] {
	const genericOptions = GENERIC_FONT_FAMILIES.map((family) => ({
		value: family,
		label: genericLabels[family],
	}))
	const libraryOptions = fonts.map((circleFont) => ({
		value: circleFont.signed_id,
		label: circleFont.family,
	}))
	const selectedValue = fontSelectValue(font, fonts)
	const hasSelectedOption = selectedValue === INHERIT_FONT_SELECT_VALUE
		|| genericOptions.some((option) => option.value === selectedValue)
		|| libraryOptions.some((option) => option.value === selectedValue)

	const orphanOptions: FontSelectOption[] = []
	if(hasCustomFont(font) && !hasSelectedOption) {
		orphanOptions.push({
			value: selectedValue,
			label: font.family,
		})
	}

	return [
		{ value: INHERIT_FONT_SELECT_VALUE, label: emptyLabel },
		...genericOptions,
		...libraryOptions,
		...orphanOptions,
	]
}

export function fontValueFromSelect(
	nextValue: string | null,
	fonts: readonly Schema.CirclesFont[],
	current: FontValue,
): FontValue | undefined {
	if(nextValue === null || nextValue === INHERIT_FONT_SELECT_VALUE) {
		return defaultFontValue()
	}

	if(isGenericFontFamily(nextValue)) {
		return { family: nextValue, url: "" }
	}

	if(nextValue.startsWith(CUSTOM_FONT_SELECT_PREFIX)) {
		return {
			family: current.family,
			url: nextValue.slice(CUSTOM_FONT_SELECT_PREFIX.length),
		}
	}

	const selected = fonts.find((circleFont) => circleFont.signed_id === nextValue)
	if(selected === undefined) {
		return undefined
	}

	return { family: selected.family, url: selected.url }
}
