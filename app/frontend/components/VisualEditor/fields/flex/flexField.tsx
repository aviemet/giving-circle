import { Field } from "@puckeditor/core"
import { type TFunction } from "i18next"
import { useState } from "react"

import {
	FlexColumnIcon,
	FlexRowIcon,
	FlexWrapIcon,
	OverflowAutoIcon,
	OverflowHiddenIcon,
	OverflowVisibleIcon,
} from "@/components/Icons"
import { i18n } from "@/lib/i18n"

import * as classes from "./flexField.css"
import { type FlexProps } from "./style"
import {
	AlignMatrix,
	FieldRow,
	IconControlTooltip,
	IconSegmented,
	PuckFieldLabel,
	UnitNumber,
	justifySelectOptions,
} from "../shared"

function flexText(t: TFunction, key: string) {
	return t(`slides.editor.fields.flex.${key}`)
}

function defaultFlexValue(): FlexProps {
	return {
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		justifyContent: "flex-start",
		alignItems: "stretch",
		gap: 0,
		overflow: "visible",
	}
}

function normalizeFlexValue(value: FlexProps | undefined): FlexProps {
	if(!value) {
		return defaultFlexValue()
	}
	return {
		...defaultFlexValue(),
		...value,
	}
}

function isDisplayValue(value: string): value is NonNullable<FlexProps["display"]> {
	return value === "block" || value === "flex"
}

function isDirectionValue(value: string): value is NonNullable<FlexProps["flexDirection"]> {
	return value === "row" || value === "column"
}

function isOverflowValue(value: string): value is NonNullable<FlexProps["overflow"]> {
	return value === "visible" || value === "auto" || value === "hidden"
}

function isJustifyValue(value: string): value is NonNullable<FlexProps["justifyContent"]> {
	return value === "flex-start"
		|| value === "center"
		|| value === "flex-end"
		|| value === "space-between"
		|| value === "space-around"
}

function isAlignValue(value: string): value is NonNullable<FlexProps["alignItems"]> {
	return value === "flex-start"
		|| value === "center"
		|| value === "flex-end"
		|| value === "stretch"
}

interface FlexFieldControlProps {
	name: string
	value: FlexProps | undefined
	onChange: (value: FlexProps) => void
	t: TFunction
}

function FlexFieldControl({ name, value, onChange, t }: FlexFieldControlProps) {
	const [localValue, setLocalValue] = useState<FlexProps>(() => normalizeFlexValue(value))

	const updateValue = (patch: Partial<FlexProps>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	const justifyOptions = justifySelectOptions().map((option) => ({
		value: option.value,
		label: flexText(t, `justify.${option.labelKey}`),
	}))

	const alignOptions = [
		{ value: "flex-start", label: flexText(t, "align.start") },
		{ value: "center", label: flexText(t, "align.center") },
		{ value: "flex-end", label: flexText(t, "align.end") },
		{ value: "stretch", label: flexText(t, "align.stretch") },
	]

	const direction = localValue.flexDirection ?? "row"
	const xOptions = direction === "column" ? alignOptions : justifyOptions
	const yOptions = direction === "column" ? justifyOptions : alignOptions

	return (
		<div className={ classes.flexFieldRoot }>
			<FieldRow label={ flexText(t, "labels.display") }>
				<IconSegmented
					name={ `${name}.display` }
					value={ localValue.display }
					options={ [
						{ value: "block", label: flexText(t, "display.block") },
						{ value: "flex", label: flexText(t, "display.flex") },
					] }
					onChange={ (nextValue) => {
						if(isDisplayValue(nextValue)) {
							updateValue({ display: nextValue })
						}
					} }
				/>
			</FieldRow>

			{ localValue.display === "flex" && (
				<>
					<FieldRow label={ flexText(t, "labels.direction") }>
						<div className={ classes.flexDirectionGroup }>
							<IconSegmented
								name={ `${name}.flexDirection` }
								value={ localValue.flexDirection }
								options={ [
									{
										value: "row",
										label: <FlexRowIcon />,
										tooltip: `${flexText(t, "direction.row")} — ${flexText(t, "direction.row_hint")}`,
									},
									{
										value: "column",
										label: <FlexColumnIcon />,
										tooltip: `${flexText(t, "direction.column")} — ${flexText(t, "direction.column_hint")}`,
									},
								] }
								onChange={ (nextValue) => {
									if(isDirectionValue(nextValue)) {
										updateValue({ flexDirection: nextValue })
									}
								} }
							/>
							<IconControlTooltip
								label={ localValue.flexWrap === "wrap"
									? `${flexText(t, "wrap.wrap")} — ${flexText(t, "wrap.wrap_hint")}`
									: `${flexText(t, "wrap.nowrap")} — ${flexText(t, "wrap.wrap_off_hint")}` }
							>
								<button
									type="button"
									className={ classes.flexWrapToggle }
									data-active={ localValue.flexWrap === "wrap" ? "true" : "false" }
									aria-label={ flexText(t, "labels.wrap") }
									aria-pressed={ localValue.flexWrap === "wrap" }
									onClick={ () => {
										updateValue({
											flexWrap: localValue.flexWrap === "wrap" ? "nowrap" : "wrap",
										})
									} }
								>
									<FlexWrapIcon />
								</button>
							</IconControlTooltip>
						</div>
					</FieldRow>

					<FieldRow label={ flexText(t, "labels.align") }>
						<AlignMatrix
							name={ `${name}.align` }
							flexDirection={ localValue.flexDirection }
							justifyContent={ localValue.justifyContent }
							alignItems={ localValue.alignItems }
							xOptions={ xOptions }
							yOptions={ yOptions }
							onChange={ ({ justifyContent, alignItems }) => {
								if(!isJustifyValue(justifyContent) || !isAlignValue(alignItems)) {
									return
								}
								updateValue({
									justifyContent,
									alignItems,
								})
							} }
						/>
					</FieldRow>

					<FieldRow label={ flexText(t, "labels.gap") }>
						<UnitNumber
							name={ `${name}.gap` }
							value={ localValue.gap }
							onChange={ (gap) => updateValue({ gap }) }
						/>
					</FieldRow>
				</>
			) }

			<FieldRow label={ flexText(t, "labels.overflow") }>
				<IconSegmented
					name={ `${name}.overflow` }
					value={ localValue.overflow }
					options={ [
						{
							value: "visible",
							label: <OverflowVisibleIcon />,
							tooltip: `${flexText(t, "overflow.visible")} — ${flexText(t, "overflow.visible_hint")}`,
						},
						{
							value: "auto",
							label: <OverflowAutoIcon />,
							tooltip: `${flexText(t, "overflow.auto")} — ${flexText(t, "overflow.auto_hint")}`,
						},
						{
							value: "hidden",
							label: <OverflowHiddenIcon />,
							tooltip: `${flexText(t, "overflow.hidden")} — ${flexText(t, "overflow.hidden_hint")}`,
						},
					] }
					onChange={ (nextValue) => {
						if(isOverflowValue(nextValue)) {
							updateValue({ overflow: nextValue })
						}
					} }
				/>
			</FieldRow>
		</div>
	)
}

function flexField(t: TFunction = i18n.t.bind(i18n)): Field<FlexProps> {
	const label = flexText(t, "label")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<FlexFieldControl
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

export { flexField, normalizeFlexValue, defaultFlexValue }
