import { type DefaultRootRenderProps } from "@measured/puck"
import clsx from "clsx"

import { Box } from "@/components"

import { type SlideRootProps } from "./slideRootProps"
import { buildBackgroundImageStyle } from "../../fields/backgroundImage"
import * as classes from "../../Puck.css"

export function SlideRootDisplay({
	children,
	backgroundColor,
	backgroundImage,
}: DefaultRootRenderProps<SlideRootProps>) {
	return (
		<Box
			className={ clsx(classes.puckSlideRoot) }
			style={ {
				"--puck-slide-root-bg": backgroundColor,
				...buildBackgroundImageStyle(backgroundImage),
			} }
		>
			{ children }
		</Box>
	)
}
