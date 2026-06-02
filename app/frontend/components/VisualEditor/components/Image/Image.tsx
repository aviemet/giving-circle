import { Image } from "@/components"
import placeholderImage from "@/images/placeholder_image.jpeg"
import { isNonEmptyString } from "@/lib/strings"

import { type ImageProps } from "./imageConfig"

export function ImageDisplay({
	title,
	src,
	margin,
	width,
	height,
	padding,
}: ImageProps) {
	return (
		<Image
			src={ isNonEmptyString(src) ? src : placeholderImage }
			m={ margin }
			p={ padding }
			alt={ title }
			width={ width }
			height={ height }
		/>
	)
}
