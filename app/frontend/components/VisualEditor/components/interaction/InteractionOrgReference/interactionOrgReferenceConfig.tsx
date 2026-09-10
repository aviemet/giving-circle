import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { InteractionOrgReference, type InteractionOrgReferenceProps } from "./InteractionOrgReference"

export const interactionOrgReferenceConfig: ComponentConfig<InteractionOrgReferenceProps> = {
	label: i18n.t("presentations.interactions.member_ui.components.org_reference.label"),
	fields: {
		fieldKey: {
			type: "text",
			label: i18n.t("presentations.interactions.member_ui.components.field_key"),
		},
		label: {
			type: "text",
			label: i18n.t("presentations.interactions.member_ui.components.label"),
		},
		outputMetric: {
			type: "select",
			label: i18n.t("presentations.interactions.member_ui.components.output_metric"),
			options: [{ label: "Vote counts", value: "vote_counts" }],
		},
	},
	defaultProps: {
		fieldKey: "preferred_org",
		label: "Organization",
		outputMetric: "vote_counts",
	},
	render: (props) => <InteractionOrgReference { ...props } />,
}
