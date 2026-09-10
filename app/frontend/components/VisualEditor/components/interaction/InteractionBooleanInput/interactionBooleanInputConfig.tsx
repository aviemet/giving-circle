import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { InteractionBooleanInput, type InteractionBooleanInputProps } from "./InteractionBooleanInput"

export const interactionBooleanInputConfig: ComponentConfig<InteractionBooleanInputProps> = {
	label: i18n.t("presentations.interactions.member_ui.components.boolean.label"),
	fields: {
		fieldKey: {
			type: "text",
			label: i18n.t("presentations.interactions.member_ui.components.field_key"),
		},
		label: {
			type: "text",
			label: i18n.t("presentations.interactions.member_ui.components.label"),
		},
	},
	defaultProps: {
		fieldKey: "anonymous",
		label: "Anonymous",
	},
	render: (props) => <InteractionBooleanInput { ...props } />,
}
