import { type DefaultRootRenderProps } from "@puckeditor/core"
import clsx from "clsx"

import { Box } from "@/components"

import * as classes from "./SlideRoot.css"
import * as editorClasses from "./SlideRoot.editor.css"
import { type SlideRootProps } from "./slideRootProps"
import {
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../fields/backgroundImage"
import { buildFlexStyle } from "../../fields/flex"
import { fontFamilyCss } from "../../fields/font"
import { buildSpacingStyle } from "../../fields/spacing"
import { SlideFontFace } from "../../SlideFontFace"

export function SlideRootDisplay({
	children,
	background,
	backgroundColor,
	backgroundImage,
	flex,
	font,
	margin,
	padding,
	puck,
	spacing,
}: DefaultRootRenderProps<SlideRootProps>) {
	const isEditing = puck.isEditing === true
	const resolvedFontFamily = fontFamilyCss(font)
	const resolvedBackground = normalizeBackgroundValue(background, {
		color: backgroundColor,
		image: backgroundImage,
	})

	return (
		<>
			<SlideFontFace font={ font } />
			<Box
				className={ clsx(classes.slideRoot, isEditing && editorClasses.slideRoot) }
				style={ {
					...(hasBackgroundColor(resolvedBackground.color)
						? { "--puck-slide-root-bg": resolvedBackground.color }
						: {}),
					...(resolvedFontFamily !== undefined ? { fontFamily: resolvedFontFamily } : {}),
					...buildBackgroundImageStyle(resolvedBackground.image),
					...buildSpacingStyle({ spacing, margin, padding }),
					...buildFlexStyle({ flex }),
				} }
			>
				{ children }
			</Box>
		</>
	)
}
