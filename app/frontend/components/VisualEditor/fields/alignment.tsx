import { Field, FieldLabel } from "@measured/puck"

import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from "@/components/Icons"
import { SegmentedControl } from "@/components/Inputs"

export type AlignmentValue = "left" | "center" | "right" | "justify"

function alignmentField(): Field<AlignmentValue>
function alignmentField(params: Partial<Field<AlignmentValue>>): Field<AlignmentValue>
function alignmentField({ label = "Alignment" }: Partial<Field<AlignmentValue>> = {}): Field<AlignmentValue> {
	return {
		type: "custom",
		label: label,
		render: ({ field, name, onChange, value }) => {
			return (
				<FieldLabel label={ label }>
					<SegmentedControl
						wrapper={ false }
						name={ name }
						defaultValue={ value }
						options={ [
							{
								value: "left",
								label: <AlignLeftIcon />,
							},
							{
								value: "center",
								label: <AlignCenterIcon />,
							},
							{
								value: "right",
								label: <AlignRightIcon />,
							},
							{
								value: "justify",
								label: <AlignJustifyIcon />,
							},
						] }
						onChange={ (choice) => onChange(choice as AlignmentValue) }
					/>
				</FieldLabel>
			)
		},
	}
}

export default alignmentField
