import { Field } from "@measured/puck"

import { TagsInput } from "@/components/Inputs"

import { dataAccess, getFlatOptions } from "../dynamicData/dataAccess"
import { StructuredContent } from "../dynamicData/types"

function tagsField(): Field<string>
function tagsField(params: Partial<Field<string>> & { options?: string[] }): Field<string>
function tagsField(params?: Partial<Field<string>> & { options?: string[] }): Field<string> {
	const { label = "Tags", options = [] } = params || {}
	const dynamicOptions = getFlatOptions(dataAccess)
	const allOptions = [...options, ...dynamicOptions.map(opt => opt.value)]

	return {
		type: "custom",
		label: label,
		render: ({ value, onChange, ...props }) => {

			return (
				<TagsInput
					value={ value }
					onChange={ onChange }
					onStructuredChange={ (structuredContent: StructuredContent) => {
						const serialized = structuredContent.blocks.map(block => {
							if(block.type === "mention") {
								return `#${block.tagPath}`
							}
							return block.content
						}).join("")
						onChange(serialized)
					} }
					placeholder="Type # to add hashtags..."
					options={ allOptions }
				/>
			)
		},
	}
}

export default tagsField
