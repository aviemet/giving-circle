import { Image } from "@/components"
import placeholderImage from "@/images/placeholder_image.jpeg"
import { isNonEmptyString } from "@/lib"

interface SlideThumbnailProps {
	src?: string
	alt: string
	height?: number
}

export function SlideThumbnail({ src, alt, height }: SlideThumbnailProps) {
	const imageSrc = isNonEmptyString(src) ? src : placeholderImage

	return (
		<Image src={ imageSrc } alt={ alt } height={ height } />
	)
}
