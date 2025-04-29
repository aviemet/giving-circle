import { Box, type BoxProps } from "@mantine/core"
import React from "react"

interface DangerousHtmlProps extends BoxProps {
	children?: string | null
}

const DangerousHtml = ({ children, ...props }: DangerousHtmlProps) => {
	return (
		<Box { ...props } dangerouslySetInnerHTML={ { __html: children || "" } } />
	)
}

export default DangerousHtml
