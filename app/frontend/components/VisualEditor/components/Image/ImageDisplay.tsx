import { type CSSProperties } from "react"

import { Image } from "@/components"
import placeholderImage from "@/images/placeholder_image.jpeg"
import { isNonEmptyString } from "@/lib/strings"

import { type ImageComponentProps } from "./Image"
import { type AlignmentValue } from "../../fields/alignment"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildImageSizeStyle, normalizeImageSize } from "../../fields/imageSize"
import { buildSpacingStyle, normalizeBoxModelValue } from "../../fields/spacing"

function alignmentStyle(alignment: AlignmentValue): CSSProperties {
	switch(alignment) {
		case "center":
			return { alignSelf: "center" }
		case "right":
			return { alignSelf: "flex-end" }
		case "justify":
			return { alignSelf: "stretch" }
		case "left":
		default:
			return { alignSelf: "flex-start" }
	}
}

export function ImageDisplay({
	title,
	src,
	alignment,
	size,
	spacing,
	border,
	puck,
}: ImageComponentProps) {
	const { dragRef } = puck
	const resolvedSpacing = normalizeBoxModelValue(spacing)
	const resolvedBorder = normalizeBorderValue(border)
	const resolvedSize = normalizeImageSize(size)

	return (
		<Image
			ref={ dragRef }
			src={ isNonEmptyString(src) ? src : placeholderImage }
			alt={ title }
			style={ {
				...buildSpacingStyle({ spacing: resolvedSpacing }),
				...buildBorderStyle(resolvedBorder),
				...buildImageSizeStyle(resolvedSize),
				...alignmentStyle(alignment),
				boxSizing: "border-box",
			} }
		/>
	)
}
