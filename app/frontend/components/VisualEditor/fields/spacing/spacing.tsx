import { Field } from "@puckeditor/core"
import clsx from "clsx"
import { useState } from "react"

import { NumberInput, Select } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import * as classes from "./boxModel.css"
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

export type BoxModelValue = {
	margin?: SpacingGroup
	padding?: SpacingGroup
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

function defaultSpacingGroup(unit: SpacingUnit = "px"): SpacingGroup {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		unit,
	}
}

export function normalizeBoxModelValue(
	value: BoxModelValue | undefined,
): BoxModelValue {
	const margin = normalizeSpacingGroup(value?.margin) ?? defaultSpacingGroup()
	const padding = normalizeSpacingGroup(value?.padding) ?? defaultSpacingGroup(margin.unit)
	return {
		margin: {
			...margin,
			unit: margin.unit ?? "px",
		},
		padding: {
			...padding,
			unit: padding.unit ?? margin.unit ?? "px",
		},
	}
}

function spacingText(key: string) {
	return i18n.t(`slides.editor.fields.spacing.${key}`)
}

type SpacingSide = keyof SpacingSides

interface SideInputProps {
	name: string
	value: number
	className: string
	ariaLabel: string
	onChange: (value: number) => void
}

function SideInput({ name, value, className, ariaLabel, onChange }: SideInputProps) {
	return (
		<div className={ clsx(classes.boxModelSideInput, className) }>
			<NumberInput
				wrapper={ false }
				name={ name }
				aria-label={ ariaLabel }
				title={ ariaLabel }
				value={ value }
				min={ 0 }
				step={ 1 }
				hideControls
				onChange={ (nextValue) => {
					const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
					onChange(Number.isNaN(numericValue) ? 0 : numericValue)
				} }
			/>
		</div>
	)
}

interface BoxModelFieldControlProps {
	name: string
	value: BoxModelValue | undefined
	onChange: (value: BoxModelValue) => void
}

function sideLabel(region: "margin" | "padding", side: SpacingSide) {
	return `${spacingText(region)} ${spacingText(`labels.${side}`)}`
}

function BoxModelFieldControl({ name, value, onChange }: BoxModelFieldControlProps) {
	const [localValue, setLocalValue] = useState<BoxModelValue>(() => normalizeBoxModelValue(value))

	const margin = localValue.margin ?? defaultSpacingGroup()
	const padding = localValue.padding ?? defaultSpacingGroup(margin.unit)
	const unit = margin.unit ?? padding.unit ?? "px"

	const commit = (next: BoxModelValue) => {
		setLocalValue(next)
		onChange(next)
	}

	const updateMargin = (patch: Partial<SpacingSides>) => {
		commit({
			margin: { ...margin, ...patch, unit },
			padding: { ...padding, unit },
		})
	}

	const updatePadding = (patch: Partial<SpacingSides>) => {
		commit({
			margin: { ...margin, unit },
			padding: { ...padding, ...patch, unit },
		})
	}

	const updateUnit = (nextUnit: SpacingUnit) => {
		commit({
			margin: { ...margin, unit: nextUnit },
			padding: { ...padding, unit: nextUnit },
		})
	}

	return (
		<div className={ clsx(classes.boxModelRoot) }>
			<div className={ clsx(classes.boxModelUnitRow) }>
				<span className={ clsx(classes.boxModelUnitLabel) }>
					{ spacingText("labels.unit") }
				</span>
				<div className={ clsx(classes.boxModelUnitSelect) }>
					<Select
						wrapper={ false }
						name={ `${name}.unit` }
						value={ unit }
						options={ [...spacingUnitOptions] }
						onChange={ (nextValue) => {
							if(!nextValue || !isSpacingUnit(nextValue)) {
								return
							}
							updateUnit(nextValue)
						} }
					/>
				</div>
			</div>

			<div className={ clsx(classes.boxModelMargin) }>
				<span className={ clsx(classes.boxModelRegionLabel) }>
					{ spacingText("margin") }
				</span>
				<SideInput
					name={ `${name}.margin.top` }
					value={ margin.top }
					className={ classes.boxModelTop }
					ariaLabel={ sideLabel("margin", "top") }
					onChange={ (top) => updateMargin({ top }) }
				/>
				<SideInput
					name={ `${name}.margin.left` }
					value={ margin.left }
					className={ classes.boxModelLeft }
					ariaLabel={ sideLabel("margin", "left") }
					onChange={ (left) => updateMargin({ left }) }
				/>
				<div className={ clsx(classes.boxModelPadding) }>
					<span className={ clsx(classes.boxModelRegionLabel) }>
						{ spacingText("padding") }
					</span>
					<SideInput
						name={ `${name}.padding.top` }
						value={ padding.top }
						className={ classes.boxModelTop }
						ariaLabel={ sideLabel("padding", "top") }
						onChange={ (top) => updatePadding({ top }) }
					/>
					<SideInput
						name={ `${name}.padding.left` }
						value={ padding.left }
						className={ classes.boxModelLeft }
						ariaLabel={ sideLabel("padding", "left") }
						onChange={ (left) => updatePadding({ left }) }
					/>
					<div className={ clsx(classes.boxModelCore) }>
						{ spacingText("content") }
					</div>
					<SideInput
						name={ `${name}.padding.right` }
						value={ padding.right }
						className={ classes.boxModelRight }
						ariaLabel={ sideLabel("padding", "right") }
						onChange={ (right) => updatePadding({ right }) }
					/>
					<SideInput
						name={ `${name}.padding.bottom` }
						value={ padding.bottom }
						className={ classes.boxModelBottom }
						ariaLabel={ sideLabel("padding", "bottom") }
						onChange={ (bottom) => updatePadding({ bottom }) }
					/>
				</div>
				<SideInput
					name={ `${name}.margin.right` }
					value={ margin.right }
					className={ classes.boxModelRight }
					ariaLabel={ sideLabel("margin", "right") }
					onChange={ (right) => updateMargin({ right }) }
				/>
				<SideInput
					name={ `${name}.margin.bottom` }
					value={ margin.bottom }
					className={ classes.boxModelBottom }
					ariaLabel={ sideLabel("margin", "bottom") }
					onChange={ (bottom) => updateMargin({ bottom }) }
				/>
			</div>
		</div>
	)
}

function boxModelField(): Field<BoxModelValue | undefined> {
	const label = spacingText("label")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<BoxModelFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

function spacingField(): Field<SpacingGroup | undefined>
function spacingField(params: Partial<Field<SpacingGroup | undefined>>): Field<SpacingGroup | undefined>
function spacingField({ label = "Spacing" }: Partial<Field<SpacingGroup | undefined>> = {}): Field<SpacingGroup | undefined> {
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			const boxValue: BoxModelValue = label === spacingText("padding")
				? { padding: value }
				: { margin: value }

			return (
				<PuckFieldLabel label={ label }>
					<BoxModelFieldControl
						name={ name }
						value={ boxValue }
						onChange={ (next) => {
							if(label === spacingText("padding")) {
								onChange(next.padding)
								return
							}
							onChange(next.margin)
						} }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { boxModelField, spacingField }
