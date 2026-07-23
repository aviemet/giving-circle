import { type PuckContext } from "@puckeditor/core"
import clsx from "clsx"
import { type CSSProperties } from "react"

import { Image } from "@/components"
import placeholderImage from "@/images/placeholder_image.jpeg"
import { isNonEmptyString } from "@/lib/strings"

import * as classes from "./Image.css"
import { type ImageProps } from "./imageConfig"
import { type AlignmentValue } from "../../fields/alignment"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildImageSizeStyle, resolveImageSize } from "../../fields/imageSize"
import { buildSpacingStyle, normalizeBoxModelValue } from "../../fields/spacing"

export type ImageComponentProps = ImageProps & {
	puck: PuckContext
}

function alignmentStyle(alignment: AlignmentValue): CSSProperties {
	if(alignment === "center") {
		return { alignSelf: "center" }
	}

	if(alignment === "right") {
		return { alignSelf: "flex-end" }
	}

	if(alignment === "justify") {
		return { alignSelf: "stretch" }
	}

	return { alignSelf: "flex-start" }
}

export function ImageDisplay({
	title,
	src,
	alignment,
	size,
	sizing,
	spacing,
	border,
	borderWidth,
	borderRadius,
	borderColor,
	width,
	height,
	puck,
}: ImageComponentProps) {
	const { dragRef } = puck
	const resolvedSpacing = normalizeBoxModelValue(spacing)
	const resolvedBorder = normalizeBorderValue(border, {
		borderWidth,
		borderRadius,
		borderColor,
	})
	const resolvedSize = resolveImageSize({ size, sizing, width, height })

	return (
		<Image
			ref={ dragRef }
			className={ clsx(classes.image) }
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
