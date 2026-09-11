import clsx from "clsx"

import { Box } from "@/components"

import { type MemberRootComponentProps } from "./MemberRoot"
import * as classes from "./MemberRoot.css"
import {
	buildBackgroundImageStyle,
	defaultBackgroundValue,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../../fields/backgroundImage"
import { buildFlexStyle } from "../../../fields/flex"
import { fontFamilyCss } from "../../../fields/font"
import { buildSpacingStyle } from "../../../fields/spacing"
import { SlideFontFace } from "../../../lib/SlideFontFace"
import * as slideRootClasses from "../../../lib/SlideRoot/SlideRoot.css"

export function MemberRootEditor({
	children,
	title,
	background,
	flex,
	font,
	spacing,
}: MemberRootComponentProps) {
	const resolvedFontFamily = fontFamilyCss(font)
	const resolvedBackground = normalizeBackgroundValue(
		background ?? defaultBackgroundValue("#ffffff"),
	)
	const backgroundColorValue = hasBackgroundColor(resolvedBackground.color)
		? resolvedBackground.color
		: "#ffffff"

	return (
		<>
			<SlideFontFace font={ font } />
			<Box
				className={ clsx(slideRootClasses.slideRoot, slideRootClasses.slideRootEditor, classes.memberRoot) }
				data-slide-snapshot-root=""
				style={ {
					"--puck-slide-root-bg": backgroundColorValue,
					...(resolvedFontFamily !== undefined ? { fontFamily: resolvedFontFamily } : {}),
					...buildBackgroundImageStyle(resolvedBackground.image),
					...buildSpacingStyle({ spacing }),
					...buildFlexStyle({ flex }),
				} }
			>
				<span className={ clsx(classes.editorHint) }>{ title || "Member screen" }</span>
				{ children }
			</Box>
		</>
	)
}
