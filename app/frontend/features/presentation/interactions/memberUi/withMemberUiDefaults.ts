import { memberRootDefaultProps } from "@/components/VisualEditor/components/interaction/MemberRoot"
import { defaultBackgroundValue } from "@/components/VisualEditor/fields/backgroundImage"
import { type PuckSlideData } from "@/components/VisualEditor/lib/EditorSave/editorPersistence"

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function mergeRootProps(props: Record<string, unknown>): Record<string, unknown> {
	const background = isRecord(props.background)
		? props.background
		: memberRootDefaultProps.background ?? defaultBackgroundValue("#ffffff")

	return {
		...memberRootDefaultProps,
		...props,
		background,
		font: isRecord(props.font) ? props.font : memberRootDefaultProps.font,
		spacing: isRecord(props.spacing) ? props.spacing : memberRootDefaultProps.spacing,
		flex: isRecord(props.flex) ? props.flex : memberRootDefaultProps.flex,
	}
}

export function withMemberUiDefaults(data: Record<string, unknown>): PuckSlideData {
	const root = isRecord(data.root) ? data.root : {}
	const props = isRecord(root.props) ? root.props : {}

	return {
		...data,
		root: {
			...root,
			props: mergeRootProps(props),
		},
	}
}

export function memberUiPuckData(value: unknown): PuckSlideData {
	if(isRecord(value)) {
		return withMemberUiDefaults(value)
	}

	return withMemberUiDefaults({})
}
