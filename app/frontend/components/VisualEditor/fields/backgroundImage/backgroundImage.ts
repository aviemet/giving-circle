import { type CSSProperties } from "react"

export type BackgroundImageSize = "cover" | "contain" | "auto" | "custom"
export type BackgroundImageRepeat = "no-repeat" | "repeat" | "repeat-x" | "repeat-y"
export type BackgroundImageAttachment = "scroll" | "fixed"

export type BackgroundImageValue = {
	url: string
	size: BackgroundImageSize
	customSize: string
	offsetX: string
	offsetY: string
	repeat: BackgroundImageRepeat
	attachment: BackgroundImageAttachment
}

export function defaultBackgroundImageValue(): BackgroundImageValue {
	return {
		url: "",
		size: "cover",
		customSize: "100% 100%",
		offsetX: "center",
		offsetY: "center",
		repeat: "no-repeat",
		attachment: "scroll",
	}
}

export function normalizeBackgroundImageValue(
	value: Partial<BackgroundImageValue> | undefined,
): BackgroundImageValue {
	return {
		...defaultBackgroundImageValue(),
		...value,
	}
}

export function isBackgroundImageSize(value: string): value is BackgroundImageSize {
	switch(value) {
		case "cover":
		case "contain":
		case "auto":
		case "custom":
			return true
		default:
			return false
	}
}

export function isBackgroundImageRepeat(value: string): value is BackgroundImageRepeat {
	switch(value) {
		case "no-repeat":
		case "repeat":
		case "repeat-x":
		case "repeat-y":
			return true
		default:
			return false
	}
}

export function isBackgroundImageAttachment(value: string): value is BackgroundImageAttachment {
	switch(value) {
		case "scroll":
		case "fixed":
			return true
		default:
			return false
	}
}

export function buildBackgroundImageStyle(
	value: Partial<BackgroundImageValue> | undefined,
): CSSProperties {
	const backgroundImage = normalizeBackgroundImageValue(value)

	if(backgroundImage.url.length === 0) {
		return {}
	}

	const backgroundSize = backgroundImage.size === "custom"
		? backgroundImage.customSize
		: backgroundImage.size

	return {
		backgroundImage: `url("${backgroundImage.url}")`,
		backgroundSize,
		backgroundPosition: `${backgroundImage.offsetX} ${backgroundImage.offsetY}`,
		backgroundRepeat: backgroundImage.repeat,
		backgroundAttachment: backgroundImage.attachment,
	}
}
