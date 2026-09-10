import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { InteractionOrgMoneyMap, type InteractionOrgMoneyMapProps } from "./InteractionOrgMoneyMap"

const outputMetricOptions = [
	{ label: "Allocated totals", value: "allocated_totals" },
	{ label: "Pledge totals", value: "pledge_totals" },
	{ label: "Org vote totals", value: "org_vote_totals" },
]

export const interactionOrgMoneyMapConfig: ComponentConfig<InteractionOrgMoneyMapProps> = {
	label: i18n.t("presentations.interactions.member_ui.components.org_money_map.label"),
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
			options: outputMetricOptions,
		},
		widget: {
			type: "select",
			label: i18n.t("presentations.interactions.member_ui.components.widget"),
			options: [{ label: "Cards", value: "cards" }],
		},
	},
	defaultProps: {
		fieldKey: "allocations",
		label: "Organizations",
		outputMetric: "allocated_totals",
		widget: "cards",
	},
	render: (props) => <InteractionOrgMoneyMap { ...props } />,
}
