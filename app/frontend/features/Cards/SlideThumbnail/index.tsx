import clsx from "clsx"

import { Image } from "@/components"
import placeholderImage from "@/images/placeholder_image.jpeg"
import { isNonEmptyString } from "@/lib"

import * as classes from "./SlideThumbnail.css"

interface SlideThumbnailProps {
	src?: string
	alt: string
}

export function SlideThumbnail({ src, alt }: SlideThumbnailProps) {
	const imageSrc = isNonEmptyString(src) ? src : placeholderImage

	return (
		<div className={ clsx(classes.thumbnail) }>
			<Image src={ imageSrc } alt={ alt } fit="cover" w="100%" h="100%" />
		</div>
	)
}
