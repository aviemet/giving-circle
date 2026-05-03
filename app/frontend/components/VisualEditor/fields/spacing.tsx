import { Field, FieldLabel } from "@measured/puck"
import { useState } from "react"

import { NumberInput } from "@/components/Inputs"

export type SpacingGroup = {
	top: number
	right: number
	bottom: number
	left: number
}

interface SpacingFieldControlProps {
	name: string
	value: SpacingGroup | undefined
	onChange: (value: SpacingGroup | undefined) => void
}

function SpacingFieldControl({ name, value, onChange }: SpacingFieldControlProps) {
	const [localValue, setLocalValue] = useState<SpacingGroup>(() => {
		if(value) return value
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		}
	})

	const handleSideChange = (side: keyof SpacingGroup, sideValue: string | number) => {
		const numericValue = typeof sideValue === "number" ? sideValue : Number(sideValue)
		const next: SpacingGroup = {
			...localValue,
			[side]: Number.isNaN(numericValue) ? 0 : numericValue,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div
			style={ {
				display: "flex",
				flexDirection: "column",
				rowGap: "0.5rem",
			} }
		>
			<div
				style={ {
					display: "flex",
					justifyContent: "center",
				} }
			>
				<div
					style={ {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "0.25rem",
					} }
				>
					<div
						style={ {
							fontSize: "0.625rem",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							opacity: 0.7,
						} }
					>
						Top
					</div>
					<NumberInput
						wrapper={ false }
						name={ `${name}.top` }
						value={ localValue.top }
						onChange={ (sideValue) => handleSideChange("top", sideValue) }
						min={ 0 }
						size="xs"
						step={ 1 }
					/>
				</div>
			</div>

			<div
				style={ {
					display: "grid",
					gridTemplateColumns: "auto minmax(0, 1fr) auto",
					alignItems: "center",
					columnGap: "0.5rem",
				} }
			>
				<div
					style={ {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "0.25rem",
					} }
				>
					<div
						style={ {
							fontSize: "0.625rem",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							opacity: 0.7,
						} }
					>
						Left
					</div>
					<NumberInput
						wrapper={ false }
						name={ `${name}.left` }
						value={ localValue.left }
						onChange={ (sideValue) => handleSideChange("left", sideValue) }
						min={ 0 }
						size="xs"
						step={ 1 }
					/>
				</div>

				<div
					style={ {
						borderRadius: "0.25rem",
						borderWidth: 1,
						borderStyle: "dashed",
						borderColor: "var(--puck-color-grey-08, rgba(255,255,255,0.15))",
						height: "2.75rem",
						backgroundColor: "rgba(255, 255, 255, 0.02)",
					} }
				/>

				<div
					style={ {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "0.25rem",
					} }
				>
					<div
						style={ {
							fontSize: "0.625rem",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							opacity: 0.7,
						} }
					>
						Right
					</div>
					<NumberInput
						wrapper={ false }
						name={ `${name}.right` }
						value={ localValue.right }
						onChange={ (sideValue) => handleSideChange("right", sideValue) }
						min={ 0 }
						size="xs"
						step={ 1 }
					/>
				</div>
			</div>

			<div
				style={ {
					display: "flex",
					justifyContent: "center",
				} }
			>
				<div
					style={ {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "0.25rem",
					} }
				>
					<div
						style={ {
							fontSize: "0.625rem",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							opacity: 0.7,
						} }
					>
						Bottom
					</div>
					<NumberInput
						wrapper={ false }
						name={ `${name}.bottom` }
						value={ localValue.bottom }
						onChange={ (sideValue) => handleSideChange("bottom", sideValue) }
						min={ 0 }
						size="xs"
						step={ 1 }
					/>
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
				<FieldLabel label={ label }>
					<SpacingFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</FieldLabel>
			)
		},
	}
}

export { spacingField }
