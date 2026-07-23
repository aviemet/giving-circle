import { type CSSProperties } from "react"

import {
	normalizeSpacingGroup,
	spacingCSSValue,
	type BoxModelValue,
	type SpacingGroup,
} from "./spacing"

export type SpacingProps = {
	margin?: SpacingGroup
	padding?: SpacingGroup
	spacing?: BoxModelValue
}

export function resolveSpacingGroups(props: SpacingProps): {
	margin: SpacingGroup | undefined
	padding: SpacingGroup | undefined
} {
	return {
		margin: normalizeSpacingGroup(props.spacing?.margin ?? props.margin),
		padding: normalizeSpacingGroup(props.spacing?.padding ?? props.padding),
	}
}

export function buildSpacingStyle(props: SpacingProps): CSSProperties {
	const { margin: marginGroup, padding: paddingGroup } = resolveSpacingGroups(props)

	return {
		...(marginGroup
			? {
				marginTop: spacingCSSValue(marginGroup.top, marginGroup.unit),
				marginRight: spacingCSSValue(marginGroup.right, marginGroup.unit),
				marginBottom: spacingCSSValue(marginGroup.bottom, marginGroup.unit),
				marginLeft: spacingCSSValue(marginGroup.left, marginGroup.unit),
			}
			: {}),
		...(paddingGroup
			? {
				paddingTop: spacingCSSValue(paddingGroup.top, paddingGroup.unit),
				paddingRight: spacingCSSValue(paddingGroup.right, paddingGroup.unit),
				paddingBottom: spacingCSSValue(paddingGroup.bottom, paddingGroup.unit),
				paddingLeft: spacingCSSValue(paddingGroup.left, paddingGroup.unit),
			}
			: {}),
	}
}
