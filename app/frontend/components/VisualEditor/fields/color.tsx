import { Field, FieldLabel } from "@measured/puck"

import { ColorInput } from "@/components/Inputs"

function colorField(): Field<string>
function colorField(params: Partial<Field<string>>): Field<string>
function colorField({ label = "Color" }: Partial<Field<string>> = {}): Field<string> {
	return {
		type: "custom",
		label: label,
		render: ({ field, name, onChange, value }) => {
			return (
				<FieldLabel label={ label }>
					<ColorInput
						name={ name }
						value={ value }
						onChange={ onChange }
						swatches={ ["#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"] }
					/>
				</FieldLabel>
			)
		},
	}
}

export default colorField
