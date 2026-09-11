import { Field } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { type GridLayoutValue } from "./grid"
import { GridFieldControl } from "./GridFieldControl"
import { PuckFieldLabel } from "../shared"

function gridText(key: string) {
	return i18n.t(`slides.editor.fields.grid.${key}`)
}

export function gridField(): Field<GridLayoutValue | undefined> {
	const label = gridText("label")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<GridFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}
