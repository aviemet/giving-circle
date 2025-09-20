import { Field } from "@measured/puck"

import { TagsInput } from "@/components/Inputs"

function tagsField(): Field<string>
function tagsField(params: Partial<Field<string>> & { options?: string[] }): Field<string>
function tagsField(params?: Partial<Field<string>> & { options?: string[] }): Field<string> {
	const { label = "Tags", options = [] } = params || {}
	return {
		type: "custom",
		label: label,
		render: ({ value, onChange, ...props }) => {

			return (
				<TagsInput
					value={ value }
					onChange={ onChange }
					placeholder="Type # to add hashtags..."
					options={ options }
				/>
			)
		},
	}
}

export default tagsField
