import { type Config } from "@puckeditor/core"

import { containerConfig, gridConfig, headingConfig, textConfig } from "@/components/VisualEditor/components"
import {
	interactionBooleanInputConfig,
	interactionOrgMoneyMapConfig,
	interactionOrgReferenceConfig,
	memberRootDefaultProps,
	memberRootFields,
	MemberRoot,
	type MemberPuckComponentProps,
	type MemberRootProps,
} from "@/components/VisualEditor/components/interaction"
import { normalizeBackgroundValue } from "@/components/VisualEditor/fields"
import { i18n } from "@/lib/i18n"

export type MemberEditorConfig = Config<{
	components: MemberPuckComponentProps
	root: MemberRootProps
	categories: ["layout", "inputs"]
}>

export const memberPuckOverrides: MemberEditorConfig = {
	root: {
		inline: true,
		fields: memberRootFields,
		defaultProps: memberRootDefaultProps,
		resolveData: ({ props }) => {
			if(props === undefined) {
				return {}
			}

			return {
				props: {
					...props,
					background: normalizeBackgroundValue(props.background),
				},
			}
		},
		render: (props) => <MemberRoot { ...props } />,
	},
	components: {
		Heading: headingConfig,
		Text: textConfig,
		Container: containerConfig,
		Grid: gridConfig,
		InteractionOrgMoneyMap: interactionOrgMoneyMapConfig,
		InteractionBooleanInput: interactionBooleanInputConfig,
		InteractionOrgReference: interactionOrgReferenceConfig,
	},
	categories: {
		layout: {
			title: i18n.t("presentations.interactions.member_ui.categories.layout"),
			components: ["Container", "Grid", "Heading", "Text"],
		},
		inputs: {
			title: i18n.t("presentations.interactions.member_ui.categories.inputs"),
			components: ["InteractionOrgMoneyMap", "InteractionBooleanInput", "InteractionOrgReference"],
		},
	},
}
