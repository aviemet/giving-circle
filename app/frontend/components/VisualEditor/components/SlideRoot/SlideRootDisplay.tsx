import { type DefaultRootRenderProps } from "@measured/puck"
import clsx from "clsx"

import { Box } from "@/components"

import * as classes from "./SlideRoot.css"
import * as editorClasses from "./SlideRoot.editor.css"
import { type SlideRootProps } from "./slideRootProps"
import { buildBackgroundImageStyle } from "../../fields/backgroundImage"
import { buildFlexStyle } from "../../fields/flex"

export function SlideRootDisplay({
	children,
	backgroundColor,
	backgroundImage,
	flex,
	puck,
}: DefaultRootRenderProps<SlideRootProps>) {
	const isEditing = puck.isEditing === true

	return (
		<Box
			className={ clsx(classes.slideRoot, isEditing && editorClasses.slideRoot) }
			style={ {
				"--puck-slide-root-bg": backgroundColor,
				...buildBackgroundImageStyle(backgroundImage),
				...buildFlexStyle({ flex }),
			} }
		>
			{ children }
		</Box>
	)
}
