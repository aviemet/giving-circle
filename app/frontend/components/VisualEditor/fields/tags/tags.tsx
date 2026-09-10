import { Field } from "@puckeditor/core"
import clsx from "clsx"

import { TagsInput } from "@/components/Inputs"

import { tagOptions } from "../../lib/dynamicData"
import * as classes from "../puckFieldStyles.css"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

const dynamicTagOptionValues = tagOptions.map(option => option.value)

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
						className={ clsx(classes.puckTagsInput) }
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
