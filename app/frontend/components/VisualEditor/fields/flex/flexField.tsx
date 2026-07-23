import { Field } from "@puckeditor/core"
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

function flexText(key: string) {
	return i18n.t(`slides.editor.fields.flex.${key}`)
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
}

function FlexFieldControl({ name, value, onChange }: FlexFieldControlProps) {
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
		label: flexText(`justify.${option.labelKey}`),
	}))

	const alignOptions = [
		{ value: "flex-start", label: flexText("align.start") },
		{ value: "center", label: flexText("align.center") },
		{ value: "flex-end", label: flexText("align.end") },
		{ value: "stretch", label: flexText("align.stretch") },
	]

	const direction = localValue.flexDirection ?? "row"
	const xOptions = direction === "column" ? alignOptions : justifyOptions
	const yOptions = direction === "column" ? justifyOptions : alignOptions

	return (
		<div className={ classes.flexFieldRoot }>
			<FieldRow label={ flexText("labels.display") }>
				<IconSegmented
					name={ `${name}.display` }
					value={ localValue.display }
					options={ [
						{ value: "block", label: flexText("display.block") },
						{ value: "flex", label: flexText("display.flex") },
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
					<FieldRow label={ flexText("labels.direction") }>
						<div className={ classes.flexDirectionGroup }>
							<IconSegmented
								name={ `${name}.flexDirection` }
								value={ localValue.flexDirection }
								options={ [
									{
										value: "row",
										label: <FlexRowIcon />,
										tooltip: `${flexText("direction.row")} — ${flexText("direction.row_hint")}`,
									},
									{
										value: "column",
										label: <FlexColumnIcon />,
										tooltip: `${flexText("direction.column")} — ${flexText("direction.column_hint")}`,
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
									? `${flexText("wrap.wrap")} — ${flexText("wrap.wrap_hint")}`
									: `${flexText("wrap.nowrap")} — ${flexText("wrap.wrap_off_hint")}` }
							>
								<button
									type="button"
									className={ classes.flexWrapToggle }
									data-active={ localValue.flexWrap === "wrap" ? "true" : "false" }
									aria-label={ flexText("labels.wrap") }
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

					<FieldRow label={ flexText("labels.align") }>
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

					<FieldRow label={ flexText("labels.gap") }>
						<UnitNumber
							name={ `${name}.gap` }
							value={ localValue.gap }
							onChange={ (gap) => updateValue({ gap }) }
						/>
					</FieldRow>
				</>
			) }

			<FieldRow label={ flexText("labels.overflow") }>
				<IconSegmented
					name={ `${name}.overflow` }
					value={ localValue.overflow }
					options={ [
						{
							value: "visible",
							label: <OverflowVisibleIcon />,
							tooltip: `${flexText("overflow.visible")} — ${flexText("overflow.visible_hint")}`,
						},
						{
							value: "auto",
							label: <OverflowAutoIcon />,
							tooltip: `${flexText("overflow.auto")} — ${flexText("overflow.auto_hint")}`,
						},
						{
							value: "hidden",
							label: <OverflowHiddenIcon />,
							tooltip: `${flexText("overflow.hidden")} — ${flexText("overflow.hidden_hint")}`,
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

function flexField(): Field<FlexProps> {
	const label = flexText("label")
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
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { flexField, normalizeFlexValue, defaultFlexValue }
