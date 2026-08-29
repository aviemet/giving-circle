import clsx from "clsx"

import { Select } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	isIterateCollection,
	isIterateOn,
	ITERATE_NONE,
	ITERATE_ORGS,
	type IterateValue,
} from "./iterate"
import * as classes from "./iterateField.css"
import { FieldRow, IconSegmented } from "../shared"

const ITERATE_TOGGLE_OFF = "off"
const ITERATE_TOGGLE_ON = "on"

function iterateText(key: string) {
	return i18n.t(`slides.editor.fields.iterate.${key}`)
}

function collectionOptions() {
	return [
		{
			value: ITERATE_ORGS,
			label: iterateText("organizations"),
		},
	]
}

export function IterateFieldControl({
	name,
	value,
	onChange,
}: {
	name: string
	value: IterateValue | undefined
	onChange: (value: IterateValue) => void
}) {
	const iterating = isIterateOn(value)
	const collection = value !== undefined && isIterateCollection(value) ? value : ITERATE_ORGS

	return (
		<div className={ clsx(classes.iterateFieldRoot) }>
			<FieldRow label={ iterateText("toggle") }>
				<IconSegmented
					name={ `${name}.enabled` }
					value={ iterating ? ITERATE_TOGGLE_ON : ITERATE_TOGGLE_OFF }
					options={ [
						{
							value: ITERATE_TOGGLE_OFF,
							label: iterateText("toggle_off"),
						},
						{
							value: ITERATE_TOGGLE_ON,
							label: iterateText("toggle_on"),
						},
					] }
					onChange={ (choice) => {
						if(choice === ITERATE_TOGGLE_OFF) {
							onChange(ITERATE_NONE)
							return
						}

						if(choice === ITERATE_TOGGLE_ON) {
							onChange(collection)
						}
					} }
				/>
			</FieldRow>
			{ iterating
				? (
					<FieldRow label={ iterateText("over") }>
						<Select
							wrapper={ false }
							name={ `${name}.collection` }
							value={ collection }
							allowDeselect={ false }
							aria-label={ iterateText("over") }
							options={ collectionOptions() }
							onChange={ (nextValue) => {
								if(nextValue === null) {
									return
								}

								if(isIterateCollection(nextValue)) {
									onChange(nextValue)
								}
							} }
						/>
					</FieldRow>
				)
				: null }
		</div>
	)
}
