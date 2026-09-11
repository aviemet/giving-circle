import clsx from "clsx"
import { type CSSProperties } from "react"

import { DangerousHtml, Text } from "@/components"

import { type TextComponentProps } from "./Text"
import * as classes from "./Text.css"
import { componentFontFamilyCss, normalizeTextFontValue, resolveFontSize } from "../../fields/font"
import { normalizeTextFlow } from "../../fields/textFlow"
import { normalizeTextLayout } from "../../fields/textLayout"
import { normalizeTypeStyle } from "../../fields/typography"
import { useResolvedTags } from "../../lib/dynamicData"
import { SlideFontFace } from "../../lib/SlideFontFace"

export function TextDisplay({
	content,
	font,
	typeStyle,
	alignment,
	flow,
	layout,
}: TextComponentProps) {
	const resolvedFont = normalizeTextFontValue(font, {
		color: "#FFFFFF",
		sizePreset: "xl",
	})

	const resolvedFlow = normalizeTextFlow(flow, true)

	const evaluatedContent = useResolvedTags(content)
	const resolvedTypeStyle = normalizeTypeStyle(typeStyle, 400)
	const resolvedLayout = normalizeTextLayout(layout)
	const resolvedSize = resolveFontSize(resolvedFont.size)
	const hasLineClamp = resolvedFlow.lineClamp > 0

	const truncateValue = resolvedFlow.truncate === "none" || resolvedFlow.truncate === undefined
		? undefined
		: resolvedFlow.truncate

	const fontFamily = componentFontFamilyCss(resolvedFont)
	const textStyle: CSSProperties = { fontFamily }

	if(resolvedSize.fontSize !== undefined) {
		textStyle.fontSize = resolvedSize.fontSize
	}

	return (
		<>
			<SlideFontFace font={ resolvedFont } />
			<Text
				className={ clsx(classes.text) }
				size={ resolvedSize.mantineSize }
				c={ resolvedFont.color.length > 0 ? resolvedFont.color : undefined }
				fw={ resolvedTypeStyle.fw }
				td={ resolvedTypeStyle.td }
				tt={ resolvedTypeStyle.tt }
				fs={ resolvedTypeStyle.fs }
				ff={ fontFamily }
				ta={ alignment }
				lineClamp={ hasLineClamp ? resolvedFlow.lineClamp : undefined }
				truncate={ truncateValue }
				inline={ resolvedLayout.inline }
				inherit={ resolvedLayout.inherit }
				span={ resolvedLayout.span }
				textWrap={ resolvedFlow.textWrap }
				style={ textStyle }
			>
				<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
			</Text>
		</>
	)
}
