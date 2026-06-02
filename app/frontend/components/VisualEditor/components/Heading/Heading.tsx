import { Box, DangerousHtml, Title } from "@/components"

import { type HeadingProps } from "./headingConfig"
import { usePresentationData } from "../../dynamicData/MockData"

export function HeadingDisplay({ title, padding, order, color }: HeadingProps) {
	const evaluatedContent = usePresentationData(title)

	return (
		<Box p={ padding }>
			<Title order={ order } c={ color }>
				<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
			</Title>
		</Box>
	)
}
