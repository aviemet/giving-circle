import { Field } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { type IterateValue } from "./iterate"
import { IterateFieldControl } from "./IterateFieldControl"
import { PuckFieldLabel } from "../shared"

function iterateText(key: string) {
	return i18n.t(`slides.editor.fields.iterate.${key}`)
}

export function iterateField(): Field<IterateValue | undefined> {
	const label = iterateText("label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<IterateFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}
