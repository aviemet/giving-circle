import { useTranslation } from "react-i18next"

import { Stack, Text, Title } from "@/components"

import * as classes from "./MemberInteractForm.css"
import {
	type ActiveInteractionProps,
	type MemberInteractionUiProps,
	memberInteractionUiBySlug,
} from "./memberInteractionUi"

export type { ActiveInteractionProps }
export type MemberInteractFormProps = MemberInteractionUiProps

export function MemberInteractForm(props: MemberInteractFormProps) {
	const { t } = useTranslation()
	const { activeInteraction } = props

	const InteractionUi = memberInteractionUiBySlug[activeInteraction.interaction_ui_template.slug]
	if(InteractionUi === undefined) {
		return (
			<Stack className={ classes.root } gap="md">
				<Title order={ 2 }>{ activeInteraction.name }</Title>
				<Text>{ t("presentations.interact.form.unsupported") }</Text>
			</Stack>
		)
	}

	return <InteractionUi { ...props } />
}
