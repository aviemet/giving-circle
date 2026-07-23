import { Field } from "@puckeditor/core"

import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from "@/components/Icons"
import { i18n } from "@/lib/i18n"

import * as classes from "./alignment.css"
import { IconSegmented, PuckFieldLabel } from "../shared"

export type AlignmentValue = "left" | "center" | "right" | "justify"

const t = i18n.t.bind(i18n)

function alignmentText(key: string) {
	return t(`slides.editor.fields.alignment.${key}`)
}

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
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<IconSegmented
						className={ classes.alignmentControl }
						name={ name }
						value={ value }
						options={ [
							{
								value: "left",
								label: <AlignLeftIcon />,
								tooltip: alignmentText("left"),
							},
							{
								value: "center",
								label: <AlignCenterIcon />,
								tooltip: alignmentText("center"),
							},
							{
								value: "right",
								label: <AlignRightIcon />,
								tooltip: alignmentText("right"),
							},
							{
								value: "justify",
								label: <AlignJustifyIcon />,
								tooltip: alignmentText("justify"),
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
