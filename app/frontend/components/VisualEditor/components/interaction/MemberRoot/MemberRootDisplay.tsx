import clsx from "clsx"
import { cloneElement, isValidElement, type ReactNode } from "react"

import { Box, Title } from "@/components"

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

interface RootZoneChildProps {
	className?: string
}

function liveRootZone(children: ReactNode) {
	if(!isValidElement<RootZoneChildProps>(children)) {
		return children
	}

	return cloneElement(children, {
		className: clsx(children.props.className, slideRootClasses.rootZoneContents),
	})
}

export function MemberRootDisplay({
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
				className={ clsx(slideRootClasses.slideRoot, classes.memberRoot) }
				data-slide-snapshot-root=""
				style={ {
					"--puck-slide-root-bg": backgroundColorValue,
					...(resolvedFontFamily !== undefined ? { fontFamily: resolvedFontFamily } : {}),
					...buildBackgroundImageStyle(resolvedBackground.image),
					...buildSpacingStyle({ spacing }),
					...buildFlexStyle({ flex }),
				} }
			>
				{ title
					? <Title order={ 2 } className={ clsx(classes.runtimeTitle) }>{ title }</Title>
					: <></>
				}

				{ liveRootZone(children) }
			</Box>
		</>
	)
}
