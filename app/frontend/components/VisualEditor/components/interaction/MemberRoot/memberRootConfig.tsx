import { i18n } from "@/lib/i18n"

import { type MemberRootProps } from "./MemberRoot"
import {
	backgroundField,
	boxModelField,
	defaultBackgroundValue,
	defaultFontValue,
	flexField,
	fontField,
} from "../../../fields"

const fundingMetricOptions = [
	{ label: "Pledge totals", value: "pledge_totals" },
	{ label: "Allocated totals", value: "allocated_totals" },
	{ label: "Org vote totals", value: "org_vote_totals" },
]

const outputMetricOptions = [
	...fundingMetricOptions,
	{ label: "Vote counts", value: "vote_counts" },
	{ label: "Money totals", value: "money_totals" },
	{ label: "Rank totals", value: "rank_totals" },
]

export const memberRootFields = {
	title: {
		type: "text" as const,
		label: i18n.t("presentations.interactions.member_ui.root.title"),
	},
	background: backgroundField(),
	font: fontField({
		allowInherit: false,
	}),
	spacing: boxModelField(),
	flex: flexField(),
	stage: {
		type: "number" as const,
		label: i18n.t("presentations.interactions.member_ui.root.stage"),
	},
	outputMetric: {
		type: "select" as const,
		label: i18n.t("presentations.interactions.member_ui.root.output_metric"),
		options: outputMetricOptions,
	},
	fundingBasis: {
		type: "select" as const,
		label: i18n.t("presentations.interactions.member_ui.root.funding_basis"),
		options: fundingMetricOptions,
	},
	excludeFundedOrgs: {
		type: "radio" as const,
		label: i18n.t("presentations.interactions.member_ui.root.exclude_funded_orgs"),
		options: [
			{ label: i18n.t("common.no"), value: false },
			{ label: i18n.t("common.yes"), value: true },
		],
	},
	defaultVotes: {
		type: "number" as const,
		label: i18n.t("presentations.interactions.member_ui.root.default_votes"),
	},
	allowNonFinalists: {
		type: "radio" as const,
		label: i18n.t("presentations.interactions.member_ui.root.allow_non_finalists"),
		options: [
			{ label: i18n.t("common.no"), value: false },
			{ label: i18n.t("common.yes"), value: true },
		],
	},
	allowOverAsk: {
		type: "radio" as const,
		label: i18n.t("presentations.interactions.member_ui.root.allow_over_ask"),
		options: [
			{ label: i18n.t("common.no"), value: false },
			{ label: i18n.t("common.yes"), value: true },
		],
	},
}

export const memberRootDefaultProps: MemberRootProps = {
	title: "Member screen",
	background: defaultBackgroundValue("#ffffff"),
	font: defaultFontValue(),
	spacing: {
		margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
		padding: { top: 16, right: 16, bottom: 16, left: 16, unit: "px" },
	},
	flex: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		alignItems: "stretch",
		justifyContent: "flex-start",
		overflow: "hidden",
		gap: 16,
	},
	stage: 1,
	excludeFundedOrgs: false,
	allowNonFinalists: false,
	allowOverAsk: false,
}
