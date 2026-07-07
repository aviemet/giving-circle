import { Field } from "@measured/puck"
import { type TFunction } from "i18next"
import { useState } from "react"
import { type CSSProperties } from "react"

import { NumberInput, Select, Textarea } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	dimensionInputToCSSValue,
	type DimensionInput,
	type DimensionUnit,
} from "../dimension"
import * as classes from "./flexItemSizing.css"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

export type FlexItemSizingMode = "auto" | "fixed" | "fill" | "clamp" | "custom"

export type FlexItemAlignSelf = "auto" | "flex-start" | "center" | "flex-end" | "stretch"

export type FlexItemSizingFineTune = {
	flexGrow?: number
	flexShrink?: number
	alignSelf?: FlexItemAlignSelf
}

export type FlexItemClampSizing = {
	min: DimensionInput
	preferred: DimensionInput
	max: DimensionInput
}

export type FlexItemSizing = {
	mode: FlexItemSizingMode
	width?: DimensionInput
	maxWidth?: DimensionInput
	clamp?: FlexItemClampSizing
	custom?: string
	fineTune?: FlexItemSizingFineTune
}

const DIMENSION_UNITS: DimensionUnit[] = ["px", "%", "vh", "vw", "rem", "auto"]

const FLEX_ITEM_CSS_PROPERTIES = new Set([
	"width",
	"minwidth",
	"maxwidth",
	"flex",
	"flexgrow",
	"flexshrink",
	"flexbasis",
	"alignself",
])

const DIMENSION_CSS_PROPERTIES = new Set([
	"width",
	"minwidth",
	"maxwidth",
	"flexbasis",
])

function sizingText(t: TFunction, key: string) {
	return t(`slides.editor.fields.sizing.${key}`)
}

function defaultDimensionInput(): DimensionInput {
	return { unit: "px" }
}

function defaultClampSizing(): FlexItemClampSizing {
	return {
		min: { amount: 200, unit: "px" },
		preferred: { amount: 30, unit: "%" },
		max: { amount: 400, unit: "px" },
	}
}

function defaultSizingValue(): FlexItemSizing {
	return { mode: "auto" }
}

function normalizeSizingValue(value: FlexItemSizing | undefined): FlexItemSizing {
	if(!value) {
		return defaultSizingValue()
	}
	return {
		...value,
		mode: value.mode ?? "auto",
	}
}

function cssPropertyToReactKey(property: string): string {
	return property.trim().replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

function isFlexItemStyleKey(key: string): key is keyof CSSProperties {
	return FLEX_ITEM_CSS_PROPERTIES.has(key.toLowerCase())
}

function shouldNormalizeDimensionValue(key: string): boolean {
	return DIMENSION_CSS_PROPERTIES.has(key.toLowerCase())
}

export function parseCustomCssDeclarations(custom: string): CSSProperties {
	const style: CSSProperties = {}

	for(const declaration of custom.split(";")) {
		const trimmed = declaration.trim()
		if(!trimmed) {
			continue
		}

		const separatorIndex = trimmed.indexOf(":")
		if(separatorIndex === - 1) {
			continue
		}

		const property = trimmed.slice(0, separatorIndex).trim()
		const rawValue = trimmed.slice(separatorIndex + 1).trim()
		if(!property || !rawValue) {
			continue
		}

		const reactKey = cssPropertyToReactKey(property)
		if(!isFlexItemStyleKey(reactKey)) {
			continue
		}

		const normalizedValue = shouldNormalizeDimensionValue(reactKey) && /^\d+$/.test(rawValue)
			? `${rawValue}px`
			: rawValue
		Object.assign(style, { [reactKey]: normalizedValue })
	}

	return style
}

function fineTuneStyle(fineTune: FlexItemSizingFineTune | undefined): CSSProperties {
	if(!fineTune) {
		return {}
	}

	return {
		...(fineTune.flexGrow !== undefined ? { flexGrow: fineTune.flexGrow } : {}),
		...(fineTune.flexShrink !== undefined ? { flexShrink: fineTune.flexShrink } : {}),
		...(fineTune.alignSelf ? { alignSelf: fineTune.alignSelf } : {}),
	}
}

export function buildFlexItemSizingStyle(sizing: FlexItemSizing | undefined): CSSProperties {
	const normalized = normalizeSizingValue(sizing)

	if(normalized.mode === "auto") {
		return fineTuneStyle(normalized.fineTune)
	}

	let style: CSSProperties = {}

	if(normalized.mode === "fixed") {
		const width = dimensionInputToCSSValue(normalized.width)
		const maxWidth = dimensionInputToCSSValue(normalized.maxWidth)
		if(width) {
			style.width = width
		}
		if(maxWidth) {
			style.maxWidth = maxWidth
		}
	} else if(normalized.mode === "fill") {
		style = {
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: 0,
			minWidth: 0,
		}
		const maxWidth = dimensionInputToCSSValue(normalized.maxWidth)
		if(maxWidth) {
			style.maxWidth = maxWidth
		}
	} else if(normalized.mode === "clamp") {
		const clamp = normalized.clamp ?? defaultClampSizing()
		const min = dimensionInputToCSSValue(clamp.min)
		const preferred = dimensionInputToCSSValue(clamp.preferred)
		const max = dimensionInputToCSSValue(clamp.max)
		if(min && preferred && max) {
			style.width = `clamp(${min}, ${preferred}, ${max})`
		}
		const maxWidth = dimensionInputToCSSValue(normalized.maxWidth)
		if(maxWidth) {
			style.maxWidth = maxWidth
		}
	} else if(normalized.mode === "custom") {
		if(normalized.custom) {
			style = parseCustomCssDeclarations(normalized.custom)
		}
	}

	return {
		...style,
		...fineTuneStyle(normalized.fineTune),
	}
}

interface DimensionInputControlProps {
	label: string
	name: string
	value: DimensionInput
	onChange: (value: DimensionInput) => void
	allowAuto?: boolean
}

function DimensionInputControl({ label, name, value, onChange, allowAuto = false }: DimensionInputControlProps) {
	const units = allowAuto ? DIMENSION_UNITS : DIMENSION_UNITS.filter((unit) => unit !== "auto")
	const showAmount = value.unit !== "auto"

	return (
		<div className={ showAmount ? classes.dimensionRow : classes.dimensionRowUnitOnly }>
			<div className={ classes.dimensionRowLabel }>
				{ label }
			</div>
			{ showAmount && (
				<NumberInput
					wrapper={ false }
					name={ `${name}.amount` }
					value={ value.amount }
					onChange={ (nextAmount) => {
						const numericValue = typeof nextAmount === "number" ? nextAmount : Number(nextAmount)
						onChange({
							...value,
							amount: Number.isNaN(numericValue) ? undefined : numericValue,
						})
					} }
					min={ 0 }
					step={ 1 }
				/>
			) }
			<Select
				wrapper={ false }
				name={ `${name}.unit` }
				value={ value.unit }
				onChange={ (nextUnit) => {
					if(!nextUnit) {
						return
					}
					onChange({
						...value,
						unit: nextUnit as DimensionUnit,
					})
				} }
				options={ units.map((unit) => ({ value: unit, label: unit })) }
			/>
		</div>
	)
}

interface FlexItemSizingFieldControlProps {
	name: string
	value: FlexItemSizing | undefined
	onChange: (value: FlexItemSizing) => void
	t: TFunction
}

function FlexItemSizingFieldControl({ name, value, onChange, t }: FlexItemSizingFieldControlProps) {
	const [localValue, setLocalValue] = useState<FlexItemSizing>(() => normalizeSizingValue(value))

	const updateValue = (patch: Partial<FlexItemSizing>) => {
		const next = { ...localValue, ...patch }
		setLocalValue(next)
		onChange(next)
	}

	const updateFineTune = (patch: Partial<FlexItemSizingFineTune>) => {
		updateValue({
			fineTune: {
				...localValue.fineTune,
				...patch,
			},
		})
	}

	const updateClamp = (key: keyof FlexItemClampSizing, dimension: DimensionInput) => {
		updateValue({
			clamp: {
				...(localValue.clamp ?? defaultClampSizing()),
				[key]: dimension,
			},
		})
	}

	const modeOptions = [
		{ value: "auto", label: sizingText(t, "modes.auto") },
		{ value: "fixed", label: sizingText(t, "modes.fixed") },
		{ value: "fill", label: sizingText(t, "modes.fill") },
		{ value: "clamp", label: sizingText(t, "modes.clamp") },
		{ value: "custom", label: sizingText(t, "modes.custom") },
	]

	const alignSelfOptions = [
		{ value: "auto", label: sizingText(t, "align_self.auto") },
		{ value: "flex-start", label: sizingText(t, "align_self.start") },
		{ value: "center", label: sizingText(t, "align_self.center") },
		{ value: "flex-end", label: sizingText(t, "align_self.end") },
		{ value: "stretch", label: sizingText(t, "align_self.stretch") },
	]

	return (
		<div className={ classes.sizingFieldRoot }>
			<Select
				wrapper={ false }
				name={ `${name}.mode` }
				value={ localValue.mode }
				onChange={ (nextMode) => {
					if(!nextMode) {
						return
					}
					updateValue({ mode: nextMode as FlexItemSizingMode })
				} }
				options={ modeOptions }
			/>

			{ localValue.mode === "fixed" && (
				<div className={ classes.sizingFieldSection }>
					<DimensionInputControl
						label={ sizingText(t, "labels.width") }
						name={ `${name}.width` }
						value={ localValue.width ?? defaultDimensionInput() }
						onChange={ (width) => updateValue({ width }) }
					/>
					<DimensionInputControl
						label={ sizingText(t, "labels.max_width") }
						name={ `${name}.maxWidth` }
						value={ localValue.maxWidth ?? defaultDimensionInput() }
						onChange={ (maxWidth) => updateValue({ maxWidth }) }
					/>
				</div>
			) }

			{ localValue.mode === "fill" && (
				<DimensionInputControl
					label={ sizingText(t, "labels.max_width") }
					name={ `${name}.maxWidth` }
					value={ localValue.maxWidth ?? defaultDimensionInput() }
					onChange={ (maxWidth) => updateValue({ maxWidth }) }
				/>
			) }

			{ localValue.mode === "clamp" && (
				<div className={ classes.sizingFieldSection }>
					<DimensionInputControl
						label={ sizingText(t, "labels.clamp_min") }
						name={ `${name}.clamp.min` }
						value={ localValue.clamp?.min ?? defaultClampSizing().min }
						onChange={ (min) => updateClamp("min", min) }
					/>
					<DimensionInputControl
						label={ sizingText(t, "labels.clamp_preferred") }
						name={ `${name}.clamp.preferred` }
						value={ localValue.clamp?.preferred ?? defaultClampSizing().preferred }
						onChange={ (preferred) => updateClamp("preferred", preferred) }
					/>
					<DimensionInputControl
						label={ sizingText(t, "labels.clamp_max") }
						name={ `${name}.clamp.max` }
						value={ localValue.clamp?.max ?? defaultClampSizing().max }
						onChange={ (max) => updateClamp("max", max) }
					/>
					<DimensionInputControl
						label={ sizingText(t, "labels.max_width") }
						name={ `${name}.maxWidth` }
						value={ localValue.maxWidth ?? defaultDimensionInput() }
						onChange={ (maxWidth) => updateValue({ maxWidth }) }
					/>
				</div>
			) }

			{ localValue.mode === "custom" && (
				<Textarea
					wrapper={ false }
					name={ `${name}.custom` }
					value={ localValue.custom ?? "" }
					onChange={ (event) => updateValue({ custom: event.currentTarget.value }) }
					placeholder={ sizingText(t, "custom_placeholder") }
					minRows={ 2 }
					autosize
				/>
			) }

			<details className={ classes.fineTune }>
				<summary>{ sizingText(t, "fine_tune.title") }</summary>
				<div className={ classes.fineTunePanel }>
					<div className={ classes.fineTuneRow }>
						<div className={ classes.dimensionRowLabel }>
							{ sizingText(t, "fine_tune.flex_grow") }
						</div>
						<NumberInput
							wrapper={ false }
							name={ `${name}.fineTune.flexGrow` }
							value={ localValue.fineTune?.flexGrow }
							onChange={ (nextValue) => {
								const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
								updateFineTune({
									flexGrow: Number.isNaN(numericValue) ? undefined : numericValue,
								})
							} }
							min={ 0 }
							step={ 1 }
						/>
					</div>
					<div className={ classes.fineTuneRow }>
						<div className={ classes.dimensionRowLabel }>
							{ sizingText(t, "fine_tune.flex_shrink") }
						</div>
						<NumberInput
							wrapper={ false }
							name={ `${name}.fineTune.flexShrink` }
							value={ localValue.fineTune?.flexShrink }
							onChange={ (nextValue) => {
								const numericValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
								updateFineTune({
									flexShrink: Number.isNaN(numericValue) ? undefined : numericValue,
								})
							} }
							min={ 0 }
							step={ 1 }
						/>
					</div>
					<div className={ classes.fineTuneRow }>
						<div className={ classes.dimensionRowLabel }>
							{ sizingText(t, "fine_tune.align_self") }
						</div>
						<Select
							wrapper={ false }
							name={ `${name}.fineTune.alignSelf` }
							value={ localValue.fineTune?.alignSelf ?? "auto" }
							onChange={ (nextValue) => {
								if(!nextValue) {
									return
								}
								updateFineTune({ alignSelf: nextValue as FlexItemAlignSelf })
							} }
							options={ alignSelfOptions }
						/>
					</div>
				</div>
			</details>
		</div>
	)
}

function flexItemSizingField(): Field<FlexItemSizing | undefined>
function flexItemSizingField(params: Partial<Field<FlexItemSizing | undefined>>): Field<FlexItemSizing | undefined>
function flexItemSizingField(
	{ label }: Partial<Field<FlexItemSizing | undefined>> = {},
): Field<FlexItemSizing | undefined> {
	const t = i18n.t.bind(i18n)
	const resolvedLabel = label ?? sizingText(t, "label")

	return {
		type: "custom",
		label: resolvedLabel,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ resolvedLabel }>
					<FlexItemSizingFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
						t={ t }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { flexItemSizingField }
