import {
	defaultBackgroundImageValue,
	normalizeBackgroundImageValue,
	type BackgroundImageValue,
} from "./backgroundImage"

export type BackgroundValue = {
	color?: string
	image: BackgroundImageValue
}

export function hasBackgroundColor(color: string | undefined): boolean {
	return color !== undefined && color.length > 0
}

export function defaultBackgroundValue(color: string | undefined = "#000000"): BackgroundValue {
	return {
		color,
		image: defaultBackgroundImageValue(),
	}
}

export function normalizeBackgroundValue(
	value: {
		color?: string
		image?: Partial<BackgroundImageValue>
	} | undefined,
	legacy?: {
		color?: string
		image?: Partial<BackgroundImageValue>
	},
): BackgroundValue {
	const defaults = defaultBackgroundValue()
	let color = defaults.color

	if(value !== undefined && "color" in value) {
		color = value.color ?? ""
	} else if(legacy?.color !== undefined) {
		color = legacy.color
	}

	return {
		color,
		image: normalizeBackgroundImageValue(value?.image ?? legacy?.image),
	}
}
