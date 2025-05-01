import { Box, ElementProps, type BoxProps } from "@mantine/core"
import clsx from "clsx"

import classes from "./Section.module.css"

interface SectionProps extends BoxProps, ElementProps<"section"> {
	fullHeight?: boolean
}

const Section = ({ children, fullHeight = false, className, ...props }: SectionProps) => {
	return (
		<Box
			component="section"
			className={ clsx(classes, className, { fullHeight }) }
			{ ...props }
		>
			{ children }
		</Box>
	)
}

export default Section
