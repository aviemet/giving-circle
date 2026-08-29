import { type FontWeightValue } from "./fontWeightOptions"

export type { FontWeightValue }
export type TextDecorationValue = "none" | "underline" | "line-through" | "overline"
export type TextTransformValue = "none" | "uppercase" | "lowercase" | "capitalize"
export type FontStyleValue = "normal" | "italic"
export type FontSizeValue = "xs" | "sm" | "md" | "lg" | "xl"
export type TitleSizeValue = "auto" | FontSizeValue | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export function isTextDecorationValue(value: string): value is TextDecorationValue {
	return value === "none"
		|| value === "underline"
		|| value === "line-through"
		|| value === "overline"
}

export function isTextTransformValue(value: string): value is TextTransformValue {
	return value === "none"
		|| value === "uppercase"
		|| value === "lowercase"
		|| value === "capitalize"
}

export function isFontStyleValue(value: string): value is FontStyleValue {
	return value === "normal" || value === "italic"
}

export function isFontSizeValue(value: string): value is FontSizeValue {
	return value === "xs"
		|| value === "sm"
		|| value === "md"
		|| value === "lg"
		|| value === "xl"
}

export function isTitleSizeValue(value: string): value is TitleSizeValue {
	return value === "auto"
		|| isFontSizeValue(value)
		|| value === "h1"
		|| value === "h2"
		|| value === "h3"
		|| value === "h4"
		|| value === "h5"
		|| value === "h6"
}
