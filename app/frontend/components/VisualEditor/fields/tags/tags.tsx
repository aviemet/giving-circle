import { Field } from "@measured/puck"

import { TagsInput } from "@/components/Inputs"

import { dataAccess, getFlatOptions } from "../../dynamicData/dataAccess"
import * as classes from "../puckFieldStyles.css"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

const dynamicTagOptionValues = getFlatOptions(dataAccess).map(option => option.value)

function tagsField(): Field<string>
function tagsField(params: Partial<Field<string>> & { options?: string[] }): Field<string>
function tagsField(params?: Partial<Field<string>> & { options?: string[] }): Field<string> {
	const { label = "Tags", options = [] } = params || {}
	const allOptions = [...options, ...dynamicTagOptionValues]

	return {
		type: "custom",
		label: label,
		render: ({ value, onChange, name, id }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TagsInput
						key={ id }
						name={ name }
						wrapper={ false }
						className={ classes.puckTagsInput }
						value={ value }
						onChange={ onChange }
						placeholder="Type # to add hashtags..."
						options={ allOptions }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { tagsField }
