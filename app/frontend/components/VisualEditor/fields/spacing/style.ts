import { type CSSProperties } from "react"

import { normalizeSpacingGroup, spacingCSSValue, type SpacingGroup } from "./spacing"

export type SpacingProps = {
	margin?: SpacingGroup
	padding?: SpacingGroup
}

export function buildSpacingStyle(props: SpacingProps): CSSProperties {
	const marginGroup = normalizeSpacingGroup(props.margin)
	const paddingGroup = normalizeSpacingGroup(props.padding)

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
