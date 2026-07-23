import { type CSSProperties } from "react"

import {
	dimensionInputToCSSValue,
	type DimensionInput,
	type DimensionUnit,
} from "../dimension"
import { type FlexItemSizing } from "../flexItemSizing"

export type ImageScaleMode = "natural" | "width" | "height" | "box"

export type ImageAspectRatio =
	| "auto"
	| "1 / 1"
	| "4 / 3"
	| "3 / 4"
	| "16 / 9"
	| "9 / 16"
	| "custom"

export type ImageObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down"

export type ImageSizeValue = {
	mode: ImageScaleMode
	width: DimensionInput
	height: DimensionInput
	maxWidth: DimensionInput
	maxHeight: DimensionInput
	aspectRatio: ImageAspectRatio
	customAspectRatio: string
	objectFit: ImageObjectFit
	objectPositionX: string
	objectPositionY: string
}

export type ImageSizeLegacyProps = {
	size?: ImageSizeValue
	sizing?: FlexItemSizing
	width?: number
	height?: number
}

const IMAGE_DIMENSION_UNITS: DimensionUnit[] = ["px", "%", "rem", "vw", "vh", "auto"]

export function imageDimensionUnits() {
	return IMAGE_DIMENSION_UNITS
}

export function isImageScaleMode(value: string): value is ImageScaleMode {
	return value === "natural"
		|| value === "width"
		|| value === "height"
		|| value === "box"
}

export function isImageAspectRatio(value: string): value is ImageAspectRatio {
	return value === "auto"
		|| value === "1 / 1"
		|| value === "4 / 3"
		|| value === "3 / 4"
		|| value === "16 / 9"
		|| value === "9 / 16"
		|| value === "custom"
}

export function isImageObjectFit(value: string): value is ImageObjectFit {
	return value === "cover"
		|| value === "contain"
		|| value === "fill"
		|| value === "none"
		|| value === "scale-down"
}

function defaultDimension(amount: number | undefined, unit: DimensionUnit): DimensionInput {
	if(unit === "auto") {
		return { unit: "auto" }
	}

	return {
		amount,
		unit,
	}
}

function hasConcreteDimension(value: DimensionInput | undefined): boolean {
	if(!value || value.unit === "auto") {
		return false
	}

	return typeof value.amount === "number" && !Number.isNaN(value.amount)
}

export function defaultImageSize(): ImageSizeValue {
	return {
		mode: "width",
		width: defaultDimension(640, "px"),
		height: defaultDimension(undefined, "auto"),
		maxWidth: defaultDimension(100, "%"),
		maxHeight: defaultDimension(undefined, "auto"),
		aspectRatio: "auto",
		customAspectRatio: "16 / 9",
		objectFit: "cover",
		objectPositionX: "50%",
		objectPositionY: "50%",
	}
}

function normalizeDimensionInput(
	value: Partial<DimensionInput> | undefined,
	fallback: DimensionInput,
): DimensionInput {
	if(!value) {
		return fallback
	}

	const unit = value.unit ?? fallback.unit
	if(unit === "auto") {
		return { unit: "auto" }
	}

	return {
		amount: value.amount ?? fallback.amount,
		unit,
	}
}

function inferScaleMode(width: DimensionInput, height: DimensionInput): ImageScaleMode {
	const hasWidth = hasConcreteDimension(width)
	const hasHeight = hasConcreteDimension(height)

	if(hasWidth && hasHeight) {
		return "box"
	}

	if(hasWidth) {
		return "width"
	}

	if(hasHeight) {
		return "height"
	}

	return "natural"
}

function enforceScaleMode(
	mode: ImageScaleMode,
	width: DimensionInput,
	height: DimensionInput,
): { width: DimensionInput, height: DimensionInput } {
	if(mode === "natural") {
		return {
			width: { unit: "auto" },
			height: { unit: "auto" },
		}
	}

	if(mode === "width") {
		return {
			width: hasConcreteDimension(width) ? width : defaultDimension(640, "px"),
			height: { unit: "auto" },
		}
	}

	if(mode === "height") {
		return {
			width: { unit: "auto" },
			height: hasConcreteDimension(height) ? height : defaultDimension(480, "px"),
		}
	}

	return {
		width: hasConcreteDimension(width) ? width : defaultDimension(640, "px"),
		height: hasConcreteDimension(height) ? height : defaultDimension(480, "px"),
	}
}

export function normalizeImageSize(value: Partial<ImageSizeValue> | undefined): ImageSizeValue {
	const defaults = defaultImageSize()
	const rawWidth = normalizeDimensionInput(value?.width, defaults.width)
	const rawHeight = normalizeDimensionInput(value?.height, defaults.height)
	const mode = value?.mode && isImageScaleMode(value.mode)
		? value.mode
		: inferScaleMode(rawWidth, rawHeight)
	const { width, height } = enforceScaleMode(mode, rawWidth, rawHeight)
	const aspectRatio = value?.aspectRatio && isImageAspectRatio(value.aspectRatio)
		? value.aspectRatio
		: defaults.aspectRatio
	const objectFit = value?.objectFit && isImageObjectFit(value.objectFit)
		? value.objectFit
		: defaults.objectFit

	return {
		mode,
		width,
		height,
		maxWidth: normalizeDimensionInput(value?.maxWidth, defaults.maxWidth),
		maxHeight: normalizeDimensionInput(value?.maxHeight, defaults.maxHeight),
		aspectRatio,
		customAspectRatio: value?.customAspectRatio?.trim()
			? value.customAspectRatio.trim()
			: defaults.customAspectRatio,
		objectFit,
		objectPositionX: value?.objectPositionX?.trim()
			? value.objectPositionX.trim()
			: defaults.objectPositionX,
		objectPositionY: value?.objectPositionY?.trim()
			? value.objectPositionY.trim()
			: defaults.objectPositionY,
	}
}

export function applyImageScaleMode(
	current: ImageSizeValue,
	mode: ImageScaleMode,
): ImageSizeValue {
	return normalizeImageSize({
		...current,
		mode,
	})
}

export function imageSizeUsesCropBox(size: ImageSizeValue): boolean {
	return size.mode === "box" || size.aspectRatio !== "auto"
}

export function resolveAspectRatioCss(size: ImageSizeValue): string | undefined {
	if(size.aspectRatio === "auto") {
		return undefined
	}

	if(size.aspectRatio === "custom") {
		const custom = size.customAspectRatio.trim()
		return custom.length > 0 ? custom : undefined
	}

	return size.aspectRatio
}

function cssDimensionOrOmit(value: DimensionInput): string | undefined {
	if(value.unit === "auto") {
		return undefined
	}

	return dimensionInputToCSSValue(value)
}

export function buildImageSizeStyle(size: ImageSizeValue | undefined): CSSProperties {
	const resolved = normalizeImageSize(size)
	const aspectRatio = resolveAspectRatioCss(resolved)
	const width = cssDimensionOrOmit(resolved.width)
	const height = cssDimensionOrOmit(resolved.height)
	const maxWidth = cssDimensionOrOmit(resolved.maxWidth)
	const maxHeight = cssDimensionOrOmit(resolved.maxHeight)
	const usesCropBox = imageSizeUsesCropBox(resolved)

	const style: CSSProperties = {
		display: "block",
	}

	if(resolved.mode === "natural") {
		style.width = "auto"
		style.height = "auto"
	} else if(resolved.mode === "width") {
		if(width !== undefined) {
			style.width = width
		}
		style.height = "auto"
	} else if(resolved.mode === "height") {
		style.width = "auto"
		if(height !== undefined) {
			style.height = height
		}
	} else {
		if(width !== undefined) {
			style.width = width
		}
		if(height !== undefined) {
			style.height = height
		}
	}

	if(maxWidth !== undefined) {
		style.maxWidth = maxWidth
	}

	if(maxHeight !== undefined) {
		style.maxHeight = maxHeight
	}

	if(aspectRatio !== undefined) {
		style.aspectRatio = aspectRatio
	}

	if(usesCropBox) {
		style.objectFit = resolved.objectFit
		style.objectPosition = `${resolved.objectPositionX} ${resolved.objectPositionY}`
	}

	return style
}

export function resolveImageSize(props: ImageSizeLegacyProps): ImageSizeValue {
	if(props.size) {
		return normalizeImageSize(props.size)
	}

	const legacyWidth = props.sizing?.mode === "fixed" && props.sizing.width
		? props.sizing.width
		: typeof props.width === "number"
			? defaultDimension(props.width, "px")
			: undefined
	const legacyHeight = typeof props.height === "number"
		? defaultDimension(props.height, "px")
		: undefined

	if(legacyWidth || legacyHeight) {
		return normalizeImageSize({
			width: legacyWidth,
			height: legacyHeight,
		})
	}

	return defaultImageSize()
}
