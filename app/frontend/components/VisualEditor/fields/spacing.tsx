import { Field } from "@measured/puck"
import { useState } from "react"

import { NumberInput, Select } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import { PuckFieldLabel } from "./PuckFieldLabel"
import * as classes from "./spacingField.css"

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

	const handleSideChange = (side: keyof SpacingSides, sideValue: string | number) => {
		const numericValue = typeof sideValue === "number" ? sideValue : Number(sideValue)
		updateSpacing({
			[side]: Number.isNaN(numericValue) ? 0 : numericValue,
		})
	}

	const unitLabel = i18n.t("slides.editor.fields.layout.labels.unit")

	return (
		<div className={ classes.spacingFieldRoot }>
			<div className={ classes.spacingFieldUnitRow }>
				<div className={ classes.spacingFieldUnitLabel }>
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

			<div className={ classes.spacingFieldRow }>
				<div className={ classes.spacingFieldSide }>
					<div className={ classes.spacingFieldSideLabel }>
						Top
					</div>
					<div className={ classes.spacingFieldControl }>
						<NumberInput
							wrapper={ false }
							name={ `${name}.top` }
							value={ localValue.top }
							onChange={ (sideValue) => handleSideChange("top", sideValue) }
							min={ 0 }
							step={ 1 }
						/>
					</div>
				</div>
			</div>

			<div className={ classes.spacingFieldGrid }>
				<div className={ classes.spacingFieldSide }>
					<div className={ classes.spacingFieldSideLabel }>
						Left
					</div>
					<div className={ classes.spacingFieldControl }>
						<NumberInput
							wrapper={ false }
							name={ `${name}.left` }
							value={ localValue.left }
							onChange={ (sideValue) => handleSideChange("left", sideValue) }
							min={ 0 }
							step={ 1 }
						/>
					</div>
				</div>

				<div className={ classes.spacingFieldBox } />

				<div className={ classes.spacingFieldSide }>
					<div className={ classes.spacingFieldSideLabel }>
						Right
					</div>
					<div className={ classes.spacingFieldControl }>
						<NumberInput
							wrapper={ false }
							name={ `${name}.right` }
							value={ localValue.right }
							onChange={ (sideValue) => handleSideChange("right", sideValue) }
							min={ 0 }
							step={ 1 }
						/>
					</div>
				</div>
			</div>

			<div className={ classes.spacingFieldRow }>
				<div className={ classes.spacingFieldSide }>
					<div className={ classes.spacingFieldSideLabel }>
						Bottom
					</div>
					<div className={ classes.spacingFieldControl }>
						<NumberInput
							wrapper={ false }
							name={ `${name}.bottom` }
							value={ localValue.bottom }
							onChange={ (sideValue) => handleSideChange("bottom", sideValue) }
							min={ 0 }
							step={ 1 }
						/>
					</div>
				</div>
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
