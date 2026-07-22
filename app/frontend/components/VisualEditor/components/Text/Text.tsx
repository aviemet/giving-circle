import clsx from "clsx"

import { DangerousHtml, Text } from "@/components"

import * as classes from "./Text.css"
import { type TextComponentProps } from "./textConfig"
import { usePresentationData } from "../../dynamicData/MockData"

export function TextDisplay({
	content,
	size,
	color,
	fw,
	td,
	tt,
	fs,
	alignment,
	lineClamp,
	truncate,
	inline,
	inherit,
	span,
	textWrap,
}: TextComponentProps) {
	const evaluatedContent = usePresentationData(content)
	const hasLineClamp = lineClamp > 0
	const truncateValue = truncate === "none" ? undefined : truncate

	return (
		<Text
			className={ clsx(classes.text) }
			size={ size }
			c={ color }
			fw={ fw }
			td={ td }
			tt={ tt }
			fs={ fs }
			ta={ alignment }
			lineClamp={ hasLineClamp ? lineClamp : undefined }
			truncate={ truncateValue }
			inline={ inline }
			inherit={ inherit }
			span={ span }
			textWrap={ textWrap }
		>
			<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
		</Text>
	)
}
