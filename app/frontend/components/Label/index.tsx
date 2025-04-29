import { Box, type BoxProps } from "@mantine/core"
import cx from "clsx"
import React from "react"
import { LabelProps as HtmlLabelProps } from "react-html-props"

interface LabelProps extends BoxProps, Omit<HtmlLabelProps, "ref" | "style"> {
	required?: boolean
}

const Label = ({ children, required = false, className, ...props }: LabelProps) => {
	return (
		<Box component="label" className={ cx(className, { required }) } { ...props }>
			{ children }
		</Box>
	)
}

export default Label
