import { Card, DangerousHtml, Text } from "@/components"
import { isNonEmptyString } from "@/lib/strings"

import { CardComponentProps } from "./Card"
import { normalizeBorderValue, buildBorderStyle } from "../../fields/border"
import { buildFlexStyle } from "../../fields/flex"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"
import { buildSpacingStyle } from "../../fields/spacing"
import { useResolvedTags } from "../../lib/dynamicData"

export function CardDisplay({
	title,
	description,
	backgroundColor,
	fontColor,
	sizing,
	border,
	...styleProps
}: CardComponentProps) {
	const evaluatedTitle = useResolvedTags(title)
	const evaluatedDescription = useResolvedTags(description)

	const resolvedBorder = normalizeBorderValue(border)

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

			{ isNonEmptyString(description) &&
				<Text c={ fontColor }>
					<DangerousHtml component="span">{ evaluatedDescription }</DangerousHtml>
				</Text>
			}

		</Card>
	)
}
