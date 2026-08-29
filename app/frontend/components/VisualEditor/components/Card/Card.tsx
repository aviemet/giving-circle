import { Card, DangerousHtml, Text } from "@/components"
import { isNonEmptyString } from "@/lib/strings"

import { type CardProps } from "./cardConfig"
import { usePresentationData } from "../../dynamicData/MockData"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildFlexStyle } from "../../fields/flex"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"
import { buildSpacingStyle } from "../../fields/spacing"

export function CardDisplay({
	title,
	description,
	backgroundColor,
	fontColor,
	sizing,
	border,
	borderWidth,
	borderRadius,
	borderColor,
	...styleProps
}: CardProps) {
	const evaluatedTitle = usePresentationData(title)
	const evaluatedDescription = usePresentationData(description)
	const showDescription = isNonEmptyString(description)
	const resolvedBorder = normalizeBorderValue(border, {
		borderWidth,
		borderRadius,
		borderColor,
	})

	return (
		<Card
			padding="md"
			style={ {
				...buildSpacingStyle(styleProps),
				...buildBorderStyle(resolvedBorder),
				...buildFlexStyle(styleProps),
				...buildFlexItemSizingStyle(sizing),
				backgroundColor,
			} }
		>

			<Text fw={ 700 } size="lg" c={ fontColor } mb="xs">
				<DangerousHtml component="span">{ evaluatedTitle }</DangerousHtml>
			</Text>

			{ showDescription && (
				<Text c={ fontColor }>
					<DangerousHtml component="span">{ evaluatedDescription }</DangerousHtml>
				</Text>
			) }

		</Card>
	)
}
