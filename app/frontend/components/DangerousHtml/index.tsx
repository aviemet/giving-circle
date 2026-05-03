import { Box, BoxProps } from "@mantine/core"
import { type Ref } from "react"
import sanitizeHtml from "sanitize-html"

export interface DangerousHtmlProps extends Omit<BoxProps, "dangerouslySetInnerHTML"> {
	children?: string
}

type DangerousHtmlPropsWithRef = DangerousHtmlProps & {
	ref?: Ref<HTMLDivElement>
}

function DangerousHtml({ children, ref, ...props }: DangerousHtmlPropsWithRef) {
	const sanitizedContent = children ? sanitizeHtml(children) : ""
	return (
		<Box
			ref={ ref }
			{ ...props }
			dangerouslySetInnerHTML={ { __html: sanitizedContent } }
		/>
	)
}

DangerousHtml.displayName = "DangerousHtml"

export { DangerousHtml }
