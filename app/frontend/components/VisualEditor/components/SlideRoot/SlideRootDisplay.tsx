import { type DefaultRootRenderProps } from "@puckeditor/core"
import clsx from "clsx"

import { Box } from "@/components"

import * as classes from "./SlideRoot.css"
import * as editorClasses from "./SlideRoot.editor.css"
import { type SlideRootProps } from "./slideRootProps"
import { buildBackgroundImageStyle } from "../../fields/backgroundImage"
import { buildFlexStyle } from "../../fields/flex"
import { fontFamilyCss } from "../../fields/font"
import { SlideFontFace } from "../../SlideFontFace"

export function SlideRootDisplay({
	children,
	backgroundColor,
	backgroundImage,
	flex,
	font,
	puck,
}: DefaultRootRenderProps<SlideRootProps>) {
	const isEditing = puck.isEditing === true
	const resolvedFontFamily = fontFamilyCss(font)

	return (
		<>
			<SlideFontFace font={ font } />
			<Box
				className={ clsx(classes.slideRoot, isEditing && editorClasses.slideRoot) }
				style={ {
					"--puck-slide-root-bg": backgroundColor,
					...(resolvedFontFamily !== undefined ? { fontFamily: resolvedFontFamily } : {}),
					...buildBackgroundImageStyle(backgroundImage),
					...buildFlexStyle({ flex }),
				} }
			>
				{ children }
			</Box>
		</>
	)
}
