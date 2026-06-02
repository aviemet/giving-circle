import { Card, DangerousHtml, Text } from "@/components"
import { isNonEmptyString } from "@/lib/strings"

import { type CardProps } from "./cardConfig"
import { usePresentationData } from "../../dynamicData/MockData"
import { buildLayoutStyle } from "../../fields/layout"

export function CardDisplay({
	title,
	description,
	backgroundColor,
	fontColor,
	...styleProps
}: CardProps) {
	const evaluatedTitle = usePresentationData(title)
	const evaluatedDescription = usePresentationData(description)
	const showDescription = isNonEmptyString(description)

	return (
		<Card style={ { ...buildLayoutStyle(styleProps), backgroundColor } } padding="md">
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
