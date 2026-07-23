import { Field } from "@puckeditor/core"
import { type TFunction } from "i18next"
import { useState } from "react"

import {
	TextNowrapIcon,
	TextWrapBalanceIcon,
	TextWrapIcon,
	TextWrapPrettyIcon,
	TextWrapStableIcon,
} from "@/components/Icons"
import { i18n } from "@/lib/i18n"

import * as classes from "./textFlow.css"
import { FieldRow, IconSegmented, PuckFieldLabel, UnitNumber } from "../shared"

export type TextWrapValue = "wrap" | "nowrap" | "balance" | "pretty" | "stable"
export type TruncateValue = "none" | "end" | "start"

export type TextFlowValue = {
	lineClamp: number
	textWrap: TextWrapValue
	truncate?: TruncateValue
}

function flowText(t: TFunction, key: string) {
	return t(`slides.editor.fields.text_flow.${key}`)
}

function isTextWrapValue(value: string): value is TextWrapValue {
	return value === "wrap"
		|| value === "nowrap"
		|| value === "balance"
		|| value === "pretty"
		|| value === "stable"
}

function isTruncateValue(value: string): value is TruncateValue {
	return value === "none" || value === "end" || value === "start"
}

export function defaultTextFlow(includeTruncate = false): TextFlowValue {
	return {
		lineClamp: 0,
		textWrap: "wrap",
		...(includeTruncate ? { truncate: "none" as const } : {}),
	}
}

export function normalizeTextFlow(
	flow: Partial<TextFlowValue> | undefined,
	legacy?: {
		lineClamp?: number
		textWrap?: TextWrapValue
		truncate?: TruncateValue
	},
	includeTruncate = false,
): TextFlowValue {
	const defaults = defaultTextFlow(includeTruncate)
	return {
		lineClamp: flow?.lineClamp ?? legacy?.lineClamp ?? defaults.lineClamp,
		textWrap: flow?.textWrap ?? legacy?.textWrap ?? defaults.textWrap,
		...(includeTruncate
			? { truncate: flow?.truncate ?? legacy?.truncate ?? defaults.truncate ?? "none" }
			: {}),
	}
}

interface TextFlowFieldControlProps {
	name: string
	value: TextFlowValue | undefined
	onChange: (value: TextFlowValue) => void
	t: TFunction
	includeTruncate: boolean
}

function TextFlowFieldControl({
	name,
	value,
	onChange,
	t,
	includeTruncate,
}: TextFlowFieldControlProps) {
	const [localValue, setLocalValue] = useState<TextFlowValue>(() => {
		return normalizeTextFlow(value, undefined, includeTruncate)
	})

	const updateValue = (patch: Partial<TextFlowValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.flowRoot }>
			<FieldRow
				label={ flowText(t, "labels.clamp") }
				tooltip={ flowText(t, "hints.clamp") }
			>
				<UnitNumber
					name={ `${name}.lineClamp` }
					value={ localValue.lineClamp }
					unit=""
					onChange={ (lineClamp) => updateValue({ lineClamp }) }
				/>
			</FieldRow>

			<FieldRow
				label={ flowText(t, "labels.wrap") }
				tooltip={ flowText(t, "hints.wrap") }
			>
				<IconSegmented
					className={ classes.wrapSegmented }
					name={ `${name}.textWrap` }
					value={ localValue.textWrap }
					options={ [
						{
							value: "wrap",
							label: <TextWrapIcon />,
							tooltip: `${flowText(t, "wrap.wrap")} — ${flowText(t, "wrap_hints.wrap")}`,
						},
						{
							value: "nowrap",
							label: <TextNowrapIcon />,
							tooltip: `${flowText(t, "wrap.nowrap")} — ${flowText(t, "wrap_hints.nowrap")}`,
						},
						{
							value: "balance",
							label: <TextWrapBalanceIcon />,
							tooltip: `${flowText(t, "wrap.balance")} — ${flowText(t, "wrap_hints.balance")}`,
						},
						{
							value: "pretty",
							label: <TextWrapPrettyIcon />,
							tooltip: `${flowText(t, "wrap.pretty")} — ${flowText(t, "wrap_hints.pretty")}`,
						},
						{
							value: "stable",
							label: <TextWrapStableIcon />,
							tooltip: `${flowText(t, "wrap.stable")} — ${flowText(t, "wrap_hints.stable")}`,
						},
					] }
					onChange={ (nextValue) => {
						if(isTextWrapValue(nextValue)) {
							updateValue({ textWrap: nextValue })
						}
					} }
				/>
			</FieldRow>

			{ includeTruncate && (
				<FieldRow
					label={ flowText(t, "labels.truncate") }
					tooltip={ flowText(t, "hints.truncate") }
				>
					<IconSegmented
						name={ `${name}.truncate` }
						value={ localValue.truncate ?? "none" }
						options={ [
							{
								value: "none",
								label: flowText(t, "truncate.none"),
								tooltip: flowText(t, "truncate_hints.none"),
							},
							{
								value: "end",
								label: flowText(t, "truncate.end"),
								tooltip: flowText(t, "truncate_hints.end"),
							},
							{
								value: "start",
								label: flowText(t, "truncate.start"),
								tooltip: flowText(t, "truncate_hints.start"),
							},
						] }
						onChange={ (nextValue) => {
							if(isTruncateValue(nextValue)) {
								updateValue({ truncate: nextValue })
							}
						} }
					/>
				</FieldRow>
			) }
		</div>
	)
}

function textFlowField(params: {
	includeTruncate?: boolean
	t?: TFunction
} = {}): Field<TextFlowValue | undefined> {
	const t = params.t ?? i18n.t.bind(i18n)
	const includeTruncate = params.includeTruncate ?? false
	const label = flowText(t, "label")

	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TextFlowFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
						t={ t }
						includeTruncate={ includeTruncate }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { textFlowField }
