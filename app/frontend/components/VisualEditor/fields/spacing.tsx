import { Field, FieldLabel } from "@measured/puck"

import { NumberInput } from "@/components/Inputs"

export type SpacingGroup = {
	top: number
	right: number
	bottom: number
	left: number
}

function spacingField(): Field<SpacingGroup | undefined>
function spacingField(params: Partial<Field<SpacingGroup | undefined>>): Field<SpacingGroup | undefined>
function spacingField({ label = "Spacing" }: Partial<Field<SpacingGroup | undefined>> = {}): Field<SpacingGroup | undefined> {
	return {
		type: "custom",
		label: label,
		render: ({ name, onChange, value }) => {
			const currentValue: SpacingGroup = value ?? {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			}

			const handleSideChange = (side: keyof SpacingGroup, sideValue: string | number) => {
				const numericValue = typeof sideValue === "number" ? sideValue : Number(sideValue)
				onChange({
					...currentValue,
					[side]: Number.isNaN(numericValue) ? 0 : numericValue,
				})
			}

			return (
				<FieldLabel label={ label }>
					<div
						style={ {
							display: "grid",
							gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
							gap: "0.25rem",
						} }
					>
						<NumberInput
							wrapper={ false }
							name={ `${name}.top` }
							value={ currentValue.top }
							onChange={ (sideValue) => handleSideChange("top", sideValue) }
						/>
						<NumberInput
							wrapper={ false }
							name={ `${name}.right` }
							value={ currentValue.right }
							onChange={ (sideValue) => handleSideChange("right", sideValue) }
						/>
						<NumberInput
							wrapper={ false }
							name={ `${name}.bottom` }
							value={ currentValue.bottom }
							onChange={ (sideValue) => handleSideChange("bottom", sideValue) }
						/>
						<NumberInput
							wrapper={ false }
							name={ `${name}.left` }
							value={ currentValue.left }
							onChange={ (sideValue) => handleSideChange("left", sideValue) }
						/>
					</div>
				</FieldLabel>
			)
		},
	}
}

export default spacingField

