import { Field } from "@puckeditor/core"

import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from "@/components/Icons"
import { SegmentedControl } from "@/components/Inputs"

import * as classes from "./alignment.css"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

export type AlignmentValue = "left" | "center" | "right" | "justify"

function isAlignmentValue(choice: string): choice is AlignmentValue {
	return choice === "left"
		|| choice === "center"
		|| choice === "right"
		|| choice === "justify"
}

function alignmentField(): Field<AlignmentValue>
function alignmentField(params: Partial<Field<AlignmentValue>>): Field<AlignmentValue>
function alignmentField({ label = "Alignment" }: Partial<Field<AlignmentValue>> = {}): Field<AlignmentValue> {
	return {
		type: "custom",
		label: label,
		render: ({ field, name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<SegmentedControl
						wrapper={ false }
						className={ classes.alignmentControl }
						fullWidth
						name={ name }
						value={ value }
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
						onChange={ (choice) => {
							if(isAlignmentValue(choice)) {
								onChange(choice)
							}
						} }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { alignmentField }
