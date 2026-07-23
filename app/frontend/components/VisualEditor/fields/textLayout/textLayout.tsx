import { Field } from "@puckeditor/core"
import { type TFunction } from "i18next"
import { useState } from "react"

import { i18n } from "@/lib/i18n"

import * as classes from "./textLayout.css"
import { FieldRow, IconSegmented, PuckFieldLabel } from "../shared"

export type TextLayoutValue = {
	inline: boolean
	inherit: boolean
	span: boolean
}

function layoutText(t: TFunction, key: string) {
	return t(`slides.editor.fields.text_layout.${key}`)
}

export function defaultTextLayout(): TextLayoutValue {
	return {
		inline: false,
		inherit: false,
		span: false,
	}
}

export function normalizeTextLayout(
	layout: Partial<TextLayoutValue> | undefined,
	legacy?: {
		inline?: boolean
		inherit?: boolean
		span?: boolean
	},
): TextLayoutValue {
	const defaults = defaultTextLayout()
	return {
		inline: layout?.inline ?? legacy?.inline ?? defaults.inline,
		inherit: layout?.inherit ?? legacy?.inherit ?? defaults.inherit,
		span: layout?.span ?? legacy?.span ?? defaults.span,
	}
}

interface TextLayoutFieldControlProps {
	name: string
	value: TextLayoutValue | undefined
	onChange: (value: TextLayoutValue) => void
	t: TFunction
}

function TextLayoutFieldControl({ name, value, onChange, t }: TextLayoutFieldControlProps) {
	const [localValue, setLocalValue] = useState<TextLayoutValue>(() => normalizeTextLayout(value))

	const updateValue = (patch: Partial<TextLayoutValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	return (
		<div className={ classes.layoutRoot }>
			<FieldRow
				label={ layoutText(t, "labels.inline") }
				tooltip={ layoutText(t, "hints.inline") }
			>
				<IconSegmented
					className={ classes.layoutToggles }
					name={ `${name}.inline` }
					value={ String(localValue.inline) }
					options={ [
						{
							value: "false",
							label: layoutText(t, "boolean.off"),
							tooltip: layoutText(t, "inline_hints.off"),
						},
						{
							value: "true",
							label: layoutText(t, "boolean.on"),
							tooltip: layoutText(t, "inline_hints.on"),
						},
					] }
					onChange={ (nextValue) => {
						updateValue({ inline: nextValue === "true" })
					} }
				/>
			</FieldRow>
			<FieldRow
				label={ layoutText(t, "labels.inherit") }
				tooltip={ layoutText(t, "hints.inherit") }
			>
				<IconSegmented
					className={ classes.layoutToggles }
					name={ `${name}.inherit` }
					value={ String(localValue.inherit) }
					options={ [
						{
							value: "false",
							label: layoutText(t, "boolean.off"),
							tooltip: layoutText(t, "inherit_hints.off"),
						},
						{
							value: "true",
							label: layoutText(t, "boolean.on"),
							tooltip: layoutText(t, "inherit_hints.on"),
						},
					] }
					onChange={ (nextValue) => {
						updateValue({ inherit: nextValue === "true" })
					} }
				/>
			</FieldRow>
			<FieldRow
				label={ layoutText(t, "labels.span") }
				tooltip={ layoutText(t, "hints.span") }
			>
				<IconSegmented
					className={ classes.layoutToggles }
					name={ `${name}.span` }
					value={ String(localValue.span) }
					options={ [
						{
							value: "false",
							label: layoutText(t, "boolean.off"),
							tooltip: layoutText(t, "span_hints.off"),
						},
						{
							value: "true",
							label: layoutText(t, "boolean.on"),
							tooltip: layoutText(t, "span_hints.on"),
						},
					] }
					onChange={ (nextValue) => {
						updateValue({ span: nextValue === "true" })
					} }
				/>
			</FieldRow>
		</div>
	)
}

function textLayoutField(t: TFunction = i18n.t.bind(i18n)): Field<TextLayoutValue | undefined> {
	const label = layoutText(t, "label")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<TextLayoutFieldControl
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

export { textLayoutField }
