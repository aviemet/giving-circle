import { type DefaultRootRenderProps } from "@puckeditor/core"
import clsx from "clsx"
import { cloneElement, isValidElement, type ReactNode } from "react"

import { Box } from "@/components"

import * as classes from "./SlideRoot.css"
import {
	type BackgroundValue,
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "../../fields/backgroundImage"
import { buildFlexStyle, type FlexProps } from "../../fields/flex"
import { fontFamilyCss, type FontValue } from "../../fields/font"
import { buildSpacingStyle, type SpacingProps } from "../../fields/spacing"
import { SlideFontFace } from "../SlideFontFace"

interface RootZoneChildProps {
	className?: string
}

// Puck wraps root children in a DropZone div. On live/preview we mark that
// wrapper with display: contents so Page flex applies to the real blocks.
// In the editor we leave it as a normal box so the root stays a drop target.
function liveRootZone(children: ReactNode) {
	if(!isValidElement<RootZoneChildProps>(children)) {
		return children
	}

	return cloneElement(children, {
		className: clsx(children.props.className, classes.rootZoneContents),
	})
}

export type SlideRootProps = SpacingProps & {
	title: string
	background?: BackgroundValue
	flex: FlexProps
	font: FontValue
}

export function SlideRoot({
	children,
	background,
	flex,
	font,
	puck,
	spacing,
}: DefaultRootRenderProps<SlideRootProps>) {
	const isEditing = puck.isEditing === true
	const resolvedFontFamily = fontFamilyCss(font)
	const resolvedBackground = normalizeBackgroundValue(background)

	return (
		<>
			<SlideFontFace font={ font } />
			<Box
				className={ clsx(classes.slideRoot, { [classes.slideRootEditor] : isEditing }) }
				data-slide-snapshot-root=""
				style={ {
					...(hasBackgroundColor(resolvedBackground.color)
						? { "--puck-slide-root-bg": resolvedBackground.color }
						: {}),
					...(resolvedFontFamily !== undefined ? { fontFamily: resolvedFontFamily } : {}),
					...buildBackgroundImageStyle(resolvedBackground.image),
					...buildSpacingStyle({ spacing }),
					...buildFlexStyle({ flex }),
				} }
			>
				{ isEditing ? children : liveRootZone(children) }
			</Box>
		</>
	)
}
