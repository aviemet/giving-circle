import { Field } from "@puckeditor/core"
import { useState } from "react"

import { ColorInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import { normalizeBorderValue } from "./border"
import * as classes from "./borderField.css"
import { type BorderProps } from "./style"
import { FieldRow, PuckFieldLabel, UnitNumber } from "../shared"

function borderText(key: string) {
	return i18n.t(`slides.editor.fields.border.${key}`)
}

interface BorderFieldControlProps {
	name: string
	value: Partial<BorderProps> | undefined
	onChange: (value: BorderProps) => void
}

function BorderFieldControl({
	name,
	value,
	onChange,
}: BorderFieldControlProps) {
	const [localValue, setLocalValue] = useState<BorderProps>(() => normalizeBorderValue(value))

	const updateValue = (patch: Partial<BorderProps>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.borderRoot }>
			<FieldRow label={ borderText("width") }>
				<UnitNumber
					name={ `${name}.borderWidth` }
					value={ localValue.borderWidth }
					onChange={ (borderWidth) => updateValue({ borderWidth }) }
				/>
			</FieldRow>

			<FieldRow label={ borderText("radius") }>
				<UnitNumber
					name={ `${name}.borderRadius` }
					value={ localValue.borderRadius }
					onChange={ (borderRadius) => updateValue({ borderRadius }) }
				/>
			</FieldRow>

			<FieldRow label={ borderText("color") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.borderColor` }
					value={ localValue.borderColor ?? "" }
					clearable
					onChange={ (borderColor) => updateValue({ borderColor }) }
					swatches={ [
						"#2e2e2e",
						"#868e96",
						"#fa5252",
						"#e64980",
						"#be4bdb",
						"#7950f2",
						"#4c6ef5",
						"#228be6",
						"#15aabf",
						"#12b886",
						"#40c057",
						"#82c91e",
						"#fab005",
						"#fd7e14",
					] }
				/>
			</FieldRow>
		</div>
	)
}

function borderField(): Field<BorderProps | undefined>
function borderField(params: { label?: string }): Field<BorderProps | undefined>
function borderField({
	label,
}: { label?: string } = {}): Field<BorderProps | undefined> {
	return {
		type: "custom",
		label: label ?? borderText("label"),
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label ?? borderText("label") }>
					<BorderFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { borderField }
