import { clsx } from "clsx"

import { Text } from "@/components"
import { Checkbox } from "@/components/Inputs"
import { useOptionalMemberInteractionFormContext } from "@/features/presentation/interactions/form"

import { type InteractionBooleanInputComponentProps } from "./InteractionBooleanInput"
import * as classes from "./InteractionBooleanInput.css"

export function InteractionBooleanInputDisplay({ fieldKey, label }: InteractionBooleanInputComponentProps) {
	const context = useOptionalMemberInteractionFormContext()

	if(context === null) {
		return (
			<Text className={ clsx(classes.placeholder) }>{ label }</Text>
		)
	}

	const checked = context.getBooleanValue(fieldKey)

	return (
		<Checkbox
			label={ label }
			checked={ checked }
			onChange={ (event) => {
				context.setBooleanValue(fieldKey, event.currentTarget.checked)
			} }
			name={ `presentation_interaction_response.response_data.${fieldKey}` }
		/>
	)
}
