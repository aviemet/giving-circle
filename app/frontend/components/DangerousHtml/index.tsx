import { Box, BoxProps } from "@mantine/core"
import { forwardRef } from "react"
import sanitizeHtml from "sanitize-html"

export interface DangerousHtmlProps extends Omit<BoxProps, "dangerouslySetInnerHTML"> {
	children?: string
}

const DangerousHtml = forwardRef<HTMLDivElement, DangerousHtmlProps>(({ children, ...props }, ref) => {
	const sanitizedContent = children ? sanitizeHtml(children) : ""
	return (
		<Box
			ref={ ref }
			{ ...props }
			dangerouslySetInnerHTML={ { __html: sanitizedContent } }
		/>
	)
})

DangerousHtml.displayName = "DangerousHtml"

export default DangerousHtml
