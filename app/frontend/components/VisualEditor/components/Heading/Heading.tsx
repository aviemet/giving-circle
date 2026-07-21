import clsx from "clsx"

import { Box, DangerousHtml, Title } from "@/components"

import { type HeadingProps } from "./headingConfig"
import { usePresentationData } from "../../dynamicData/MockData"
import * as classes from "../../Puck.css"

export function HeadingDisplay({ title, padding, order, color }: HeadingProps) {
	const evaluatedContent = usePresentationData(title)

	return (
		<Box p={ padding } className={ clsx(classes.presentationHeading) }>
			<Title order={ order } c={ color }>
				<DangerousHtml component="span">{ evaluatedContent }</DangerousHtml>
			</Title>
		</Box>
	)
}
