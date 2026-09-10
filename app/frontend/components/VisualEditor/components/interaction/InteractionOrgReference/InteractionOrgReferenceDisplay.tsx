import clsx from "clsx"

import { Text } from "@/components"
import { HiddenInput, Select } from "@/components/Inputs"
import { useOptionalMemberInteractionFormContext } from "@/features/presentation/interactions/form"

import { type InteractionOrgReferenceComponentProps } from "./InteractionOrgReference"
import * as classes from "./InteractionOrgReference.css"

export function InteractionOrgReferenceDisplay({ fieldKey, label }: InteractionOrgReferenceComponentProps) {
	const context = useOptionalMemberInteractionFormContext()
	if(context === null) {
		return <Text className={ clsx(classes.placeholder) }>{ label }</Text>
	}

	const orgs = context.formContext.presentation_orgs ?? []
	const selectedOrgId = context.getOrgReferenceValue(fieldKey)

	return (
		<>
			<Select
				label={ label }
				options={ orgs.map((org) => ({ value: org.id, label: org.name })) }
				value={ selectedOrgId }
				onChange={ (value: string | null) => {
					context.setOrgReferenceValue(fieldKey, value)
				} }
			/>
			<HiddenInput
				name={ `presentation_interaction_response.response_data.${fieldKey}` }
				value={ selectedOrgId ?? "" }
			/>
		</>
	)
}
