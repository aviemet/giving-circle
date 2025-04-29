import { Box, ElementProps, type BoxProps } from "@mantine/core"
import cx from "clsx"
import React from "react"

import classes from "./Section.module.css"

interface SectionProps extends BoxProps, ElementProps<"section"> {
	fullHeight?: boolean
}

const Section = ({ children, fullHeight = false, className, ...props }: SectionProps) => {
	return (
		<Box
			component="section"
			className={ cx(classes, className, { fullHeight }) }
			{ ...props }
		>
			{ children }
		</Box>
	)
}

export default Section
