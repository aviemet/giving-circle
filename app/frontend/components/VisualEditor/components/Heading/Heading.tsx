import clsx from "clsx"

import { Box, DangerousHtml, Title } from "@/components"

import * as classes from "./Heading.css"
import { type HeadingProps } from "./headingConfig"
import { usePresentationData } from "../../dynamicData/MockData"
import { componentFontFamilyCss } from "../../fields/font"
import { SlideFontFace } from "../../SlideFontFace"

export function HeadingDisplay({
	title,
	padding,
	order,
	size,
	color,
	fw,
	td,
	tt,
	fs,
	font,
	alignment,
	lineClamp,
	textWrap,
}: HeadingProps) {
	const evaluatedContent = usePresentationData(title)
	const hasLineClamp = lineClamp > 0
	const titleSize = size === "auto" ? undefined : size

	return (
		<>
			<SlideFontFace font={ font } />
			<Box p={ padding } className={ clsx(classes.heading) }>
				<Title
					order={ order }
					size={ titleSize }
					c={ color }
					fw={ fw }
					td={ td }
					tt={ tt }
					fs={ fs }
					ff={ componentFontFamilyCss(font) }
					ta={ alignment }
					lineClamp={ hasLineClamp ? lineClamp : undefined }
					textWrap={ textWrap }
				>
					<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
				</Title>
			</Box>
		</>
	)
}
