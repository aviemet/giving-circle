import { Field } from "@puckeditor/core"
import { useState } from "react"

import { NumberInput, Select } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import * as classes from "./spacing.css"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

export type SpacingUnit = "px" | "rem" | "em" | "%"

export type SpacingSides = {
	top: number
	right: number
	bottom: number
	left: number
}

export type SpacingGroup = SpacingSides & {
	unit?: SpacingUnit
}

const spacingUnitOptions = [
	{ label: "px", value: "px" },
	{ label: "rem", value: "rem" },
	{ label: "em", value: "em" },
	{ label: "%", value: "%" },
] as const satisfies ReadonlyArray<{ label: string, value: SpacingUnit }>

function isSpacingUnit(value: string | null): value is SpacingUnit {
	return value === "px"
		|| value === "rem"
		|| value === "em"
		|| value === "%"
}

export function normalizeSpacingGroup(
	group: Partial<SpacingGroup> | undefined,
): SpacingGroup | undefined {
	if(!group) {
		return undefined
	}

	return {
		top: group.top ?? 0,
		right: group.right ?? 0,
		bottom: group.bottom ?? 0,
		left: group.left ?? 0,
		unit: group.unit ?? "px",
	}
}

export function spacingCSSValue(value: number, unit: SpacingUnit = "px"): string {
	return `${value}${unit}`
}

function defaultSpacingGroup(): SpacingGroup {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		unit: "px",
	}
}

interface SpacingFieldControlProps {
	name: string
	value: SpacingGroup | undefined
	onChange: (value: SpacingGroup | undefined) => void
}

function SpacingSideInput({
	label,
	name,
	value,
	onChange,
}: {
	label: string
	name: string
	value: number
	onChange: (value: number) => void
}) {
	return (
		<div className={ classes.spacingFieldSide }>
			<div className={ classes.spacingFieldLabel }>
				{ label }
			</div>
			<div className={ classes.spacingFieldInput }>
				<NumberInput
					wrapper={ false }
					name={ name }
					value={ value }
					onChange={ (sideValue) => {
						const numericValue = typeof sideValue === "number" ? sideValue : Number(sideValue)
						onChange(Number.isNaN(numericValue) ? 0 : numericValue)
					} }
					min={ 0 }
					step={ 1 }
				/>
			</div>
		</div>
	)
}

function SpacingFieldControl({ name, value, onChange }: SpacingFieldControlProps) {
	const [localValue, setLocalValue] = useState<SpacingGroup>(() => {
		return normalizeSpacingGroup(value) ?? defaultSpacingGroup()
	})

	const updateSpacing = (patch: Partial<SpacingGroup>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	const unitLabel = i18n.t("slides.editor.fields.spacing.labels.unit")

	return (
		<div className={ classes.spacingFieldRoot }>
			<div className={ classes.spacingFieldUnitRow }>
				<div className={ classes.spacingFieldLabel }>
					{ unitLabel }
				</div>
				<div className={ classes.spacingFieldUnitSelect }>
					<Select
						wrapper={ false }
						name={ `${name}.unit` }
						value={ localValue.unit }
						options={ [...spacingUnitOptions] }
						onChange={ (nextValue) => {
							if(!nextValue || !isSpacingUnit(nextValue)) return

							updateSpacing({ unit: nextValue })
						} }
					/>
				</div>
			</div>

			<div className={ classes.spacingFieldSides }>
				<SpacingSideInput
					label="Top"
					name={ `${name}.top` }
					value={ localValue.top }
					onChange={ (top) => updateSpacing({ top }) }
				/>
				<div className={ classes.spacingFieldMiddleRow }>
					<SpacingSideInput
						label="Left"
						name={ `${name}.left` }
						value={ localValue.left }
						onChange={ (left) => updateSpacing({ left }) }
					/>
					<SpacingSideInput
						label="Right"
						name={ `${name}.right` }
						value={ localValue.right }
						onChange={ (right) => updateSpacing({ right }) }
					/>
				</div>
				<SpacingSideInput
					label="Bottom"
					name={ `${name}.bottom` }
					value={ localValue.bottom }
					onChange={ (bottom) => updateSpacing({ bottom }) }
				/>
			</div>
		</div>
	)
}

function spacingField(): Field<SpacingGroup | undefined>
function spacingField(params: Partial<Field<SpacingGroup | undefined>>): Field<SpacingGroup | undefined>
function spacingField({ label = "Spacing" }: Partial<Field<SpacingGroup | undefined>> = {}): Field<SpacingGroup | undefined> {
	return {
		type: "custom",
		label: label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<SpacingFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { spacingField }
