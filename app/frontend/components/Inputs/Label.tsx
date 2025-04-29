import { Box, type BoxProps } from "@mantine/core"
import cx from "clsx"
import React from "react"

interface LabelProps extends
	BoxProps,
	Omit<React.ComponentPropsWithoutRef<"label">, keyof BoxProps> {

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
