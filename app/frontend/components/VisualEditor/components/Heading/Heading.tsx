import clsx from "clsx"
import { type CSSProperties } from "react"

import { Box, DangerousHtml, Title } from "@/components"

import * as classes from "./Heading.css"
import { type HeadingProps } from "./headingConfig"
import { usePresentationData } from "../../dynamicData/MockData"
import { componentFontFamilyCss, normalizeTextFontValue, resolveFontSize } from "../../fields/font"
import { normalizeHeadingMetrics } from "../../fields/headingMetrics"
import { normalizeTextFlow } from "../../fields/textFlow"
import { normalizeTypeStyle } from "../../fields/typography"
import { SlideFontFace } from "../../SlideFontFace"

export function HeadingDisplay({
	title,
	metrics,
	order,
	size,
	padding,
	color,
	font,
	typeStyle,
	fw,
	td,
	tt,
	fs,
	alignment,
	flow,
	lineClamp,
	textWrap,
}: HeadingProps) {
	const evaluatedContent = usePresentationData(title)
	const resolvedMetrics = normalizeHeadingMetrics(metrics, { order, padding })
	const resolvedFont = normalizeTextFontValue(
		font,
		{
			font,
			color,
			size: typeof size === "string" ? size : undefined,
		},
		{
			color: "#FFFFFF",
			sizePreset: "auto",
		},
	)
	const resolvedTypeStyle = normalizeTypeStyle(typeStyle, { fw, td, tt, fs }, 700)
	const resolvedFlow = normalizeTextFlow(flow, { lineClamp, textWrap })
	const resolvedSize = resolveFontSize(resolvedFont.size)
	const hasLineClamp = resolvedFlow.lineClamp > 0
	const titleStyle: CSSProperties | undefined = resolvedSize.fontSize === undefined
		? undefined
		: { fontSize: resolvedSize.fontSize }

	return (
		<>
			<SlideFontFace font={ resolvedFont } />
			<Box p={ resolvedMetrics.padding } className={ clsx(classes.heading) }>
				<Title
					order={ resolvedMetrics.order }
					size={ resolvedSize.mantineSize }
					c={ resolvedFont.color.length > 0 ? resolvedFont.color : undefined }
					fw={ resolvedTypeStyle.fw }
					td={ resolvedTypeStyle.td }
					tt={ resolvedTypeStyle.tt }
					fs={ resolvedTypeStyle.fs }
					ff={ componentFontFamilyCss(resolvedFont) }
					ta={ alignment }
					lineClamp={ hasLineClamp ? resolvedFlow.lineClamp : undefined }
					textWrap={ resolvedFlow.textWrap }
					style={ titleStyle }
				>
					<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
				</Title>
			</Box>
		</>
	)
}
