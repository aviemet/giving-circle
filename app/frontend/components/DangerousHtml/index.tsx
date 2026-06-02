import { Box, type BoxProps } from "@mantine/core"
import sanitizeHtml from "sanitize-html"

type DangerousHtmlElement = "div" | "span"

export interface DangerousHtmlProps extends Omit<BoxProps, "dangerouslySetInnerHTML" | "component"> {
	children?: string
	component?: DangerousHtmlElement
}

function DangerousHtml({ children, component = "div", ...props }: DangerousHtmlProps) {
	const sanitizedContent = children ? sanitizeHtml(children) : ""
	return (
		<Box
			component={ component }
			{ ...props }
			dangerouslySetInnerHTML={ { __html: sanitizedContent } }
		/>
	)
}

DangerousHtml.displayName = "DangerousHtml"

export { DangerousHtml }
