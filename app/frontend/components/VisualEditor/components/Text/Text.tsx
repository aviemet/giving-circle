import clsx from "clsx"
import { type CSSProperties } from "react"

import { DangerousHtml, Text } from "@/components"

import * as classes from "./Text.css"
import { type TextComponentProps } from "./textConfig"
import { usePresentationData } from "../../dynamicData/MockData"
import { componentFontFamilyCss, normalizeTextFontValue, resolveFontSize } from "../../fields/font"
import { normalizeTextFlow } from "../../fields/textFlow"
import { normalizeTextLayout } from "../../fields/textLayout"
import { normalizeTypeStyle } from "../../fields/typography"
import { SlideFontFace } from "../../SlideFontFace"

export function TextDisplay({
	content,
	size,
	color,
	font,
	typeStyle,
	fw,
	td,
	tt,
	fs,
	alignment,
	flow,
	layout,
	lineClamp,
	truncate,
	inline,
	inherit,
	span,
	textWrap,
}: TextComponentProps) {
	const evaluatedContent = usePresentationData(content)
	const resolvedFont = normalizeTextFontValue(
		font,
		{
			font,
			color,
			size,
		},
		{
			color: "#FFFFFF",
			sizePreset: "md",
		},
	)
	const resolvedTypeStyle = normalizeTypeStyle(typeStyle, { fw, td, tt, fs }, 400)
	const resolvedFlow = normalizeTextFlow(
		flow,
		{ lineClamp, textWrap, truncate },
		true,
	)
	const resolvedLayout = normalizeTextLayout(layout, { inline, inherit, span })
	const resolvedSize = resolveFontSize(resolvedFont.size)
	const hasLineClamp = resolvedFlow.lineClamp > 0
	const truncateValue = resolvedFlow.truncate === "none" || resolvedFlow.truncate === undefined
		? undefined
		: resolvedFlow.truncate
	const textStyle: CSSProperties | undefined = resolvedSize.fontSize === undefined
		? undefined
		: { fontSize: resolvedSize.fontSize }

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
				ff={ componentFontFamilyCss(resolvedFont) }
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
