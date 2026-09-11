import clsx from "clsx"
import { type CSSProperties } from "react"

import { Box, DangerousHtml, Title } from "@/components"

import { type HeadingComponentProps } from "./Heading"
import * as classes from "./Heading.css"
import { componentFontFamilyCss, normalizeTextFontValue, resolveFontSize } from "../../fields/font"
import { normalizeHeadingMetrics } from "../../fields/headingMetrics"
import { lengthCss, SPACING_LENGTH_UNITS, coerceLength } from "../../fields/shared/length"
import { normalizeTextFlow } from "../../fields/textFlow"
import { normalizeTypeStyle } from "../../fields/typography"
import { useResolvedTags } from "../../lib/dynamicData"
import { SlideFontFace } from "../../lib/SlideFontFace"

export function HeadingDisplay({
	title,
	metrics,
	font,
	typeStyle,
	alignment,
	flow,
}: HeadingComponentProps) {
	const evaluatedContent = useResolvedTags(title)
	const resolvedMetrics = normalizeHeadingMetrics(metrics)

	const resolvedFont = normalizeTextFontValue(font, {
		color: "#FFFFFF",
		sizePreset: "auto",
	})

	const resolvedTypeStyle = normalizeTypeStyle(typeStyle, 700)
	const resolvedFlow = normalizeTextFlow(flow)
	const resolvedSize = resolveFontSize(resolvedFont.size, resolvedMetrics.order)
	const fontFamily = componentFontFamilyCss(resolvedFont)
	const titleStyle: CSSProperties = { fontFamily }

	if(resolvedSize.fontSize !== undefined) {
		titleStyle.fontSize = resolvedSize.fontSize
	}

	return (
		<>
			<SlideFontFace font={ resolvedFont } />
			<Box
				p={ lengthCss(coerceLength(resolvedMetrics.padding, SPACING_LENGTH_UNITS, "px")) }
				className={ clsx(classes.heading) }
			>
				<Title
					order={ resolvedMetrics.order }
					size={ resolvedSize.mantineSize }
					c={ resolvedFont.color.length > 0 ? resolvedFont.color : undefined }
					fw={ resolvedTypeStyle.fw }
					td={ resolvedTypeStyle.td }
					tt={ resolvedTypeStyle.tt }
					fs={ resolvedTypeStyle.fs }
					ff={ fontFamily }
					ta={ alignment }
					lineClamp={ resolvedFlow.lineClamp > 0 ? resolvedFlow.lineClamp : undefined }
					textWrap={ resolvedFlow.textWrap }
					style={ titleStyle }
				>
					<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
				</Title>
			</Box>
		</>
	)
}
