import { Box, type BoxProps } from "@mantine/core"
import clsx from "clsx"
import { LabelProps as HtmlLabelProps } from "react-html-props"

interface LabelProps extends BoxProps, Omit<HtmlLabelProps, "ref" | "style"> {
	required?: boolean
}

const Label = ({ children, required = false, className, ...props }: LabelProps) => {
	return (
		<Box component="label" className={ clsx(className, { required }) } { ...props }>
			{ children }
		</Box>
	)
}

export default Label
