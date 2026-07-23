import { type TFunction } from "i18next"

import { Select, TextInput } from "@/components/Inputs"

import {
	isFontSizeModeValue,
	isFontSizePresetValue,
	type FlexibleFontSize,
	type FontSizePreset,
} from "./fontSize"
import * as classes from "./fontSizeControl.css"
import { FieldRow, IconSegmented } from "../shared"

function sizeText(t: TFunction, key: string) {
	return t(`slides.editor.fields.font.size.${key}`)
}

interface FontSizeControlProps {
	name: string
	value: FlexibleFontSize
	onChange: (value: FlexibleFontSize) => void
	t: TFunction
	allowAuto: boolean
}

export function FontSizeControl({
	name,
	value,
	onChange,
	t,
	allowAuto,
}: FontSizeControlProps) {
	const presetOptions: { label: string, value: FontSizePreset }[] = [
		...(allowAuto ? [{ label: sizeText(t, "presets.auto"), value: "auto" as const }] : []),
		{ label: "xs", value: "xs" },
		{ label: "sm", value: "sm" },
		{ label: "md", value: "md" },
		{ label: "lg", value: "lg" },
		{ label: "xl", value: "xl" },
		{ label: "2xl", value: "2xl" },
		{ label: "3xl", value: "3xl" },
		{ label: "4xl", value: "4xl" },
		{ label: "h1", value: "h1" },
		{ label: "h2", value: "h2" },
		{ label: "h3", value: "h3" },
		{ label: "h4", value: "h4" },
		{ label: "h5", value: "h5" },
		{ label: "h6", value: "h6" },
	]

	return (
		<div className={ classes.sizeStack }>
			<FieldRow
				label={ sizeText(t, "labels.mode") }
				tooltip={ sizeText(t, "hints.mode") }
			>
				<IconSegmented
					name={ `${name}.mode` }
					value={ value.mode }
					options={ [
						{
							value: "preset",
							label: sizeText(t, "modes.preset"),
							tooltip: sizeText(t, "mode_hints.preset"),
						},
						{
							value: "custom",
							label: sizeText(t, "modes.custom"),
							tooltip: sizeText(t, "mode_hints.custom"),
						},
						{
							value: "clamp",
							label: sizeText(t, "modes.clamp"),
							tooltip: sizeText(t, "mode_hints.clamp"),
						},
					] }
					onChange={ (nextValue) => {
						if(isFontSizeModeValue(nextValue)) {
							onChange({
								...value,
								mode: nextValue,
							})
						}
					} }
				/>
			</FieldRow>

			{ value.mode === "preset" && (
				<FieldRow label={ sizeText(t, "labels.preset") }>
					<Select
						wrapper={ false }
						name={ `${name}.preset` }
						value={ value.preset }
						options={ presetOptions }
						onChange={ (nextValue) => {
							if(nextValue && isFontSizePresetValue(nextValue)) {
								onChange({
									...value,
									preset: nextValue,
								})
							}
						} }
					/>
				</FieldRow>
			) }

			{ value.mode === "custom" && (
				<FieldRow
					label={ sizeText(t, "labels.custom") }
					tooltip={ sizeText(t, "hints.custom") }
				>
					<TextInput
						wrapper={ false }
						name={ `${name}.custom` }
						value={ value.custom }
						placeholder={ sizeText(t, "custom_placeholder") }
						onChange={ (event) => {
							onChange({
								...value,
								custom: event.currentTarget.value,
							})
						} }
					/>
				</FieldRow>
			) }

			{ value.mode === "clamp" && (
				<>
					<FieldRow
						label={ sizeText(t, "labels.min") }
						tooltip={ sizeText(t, "hints.min") }
					>
						<TextInput
							wrapper={ false }
							name={ `${name}.clampMin` }
							value={ value.clampMin }
							placeholder="1rem"
							onChange={ (event) => {
								onChange({
									...value,
									clampMin: event.currentTarget.value,
								})
							} }
						/>
					</FieldRow>
					<FieldRow
						label={ sizeText(t, "labels.preferred") }
						tooltip={ sizeText(t, "hints.preferred") }
					>
						<TextInput
							wrapper={ false }
							name={ `${name}.clampPreferred` }
							value={ value.clampPreferred }
							placeholder="5vw"
							onChange={ (event) => {
								onChange({
									...value,
									clampPreferred: event.currentTarget.value,
								})
							} }
						/>
					</FieldRow>
					<FieldRow
						label={ sizeText(t, "labels.max") }
						tooltip={ sizeText(t, "hints.max") }
					>
						<TextInput
							wrapper={ false }
							name={ `${name}.clampMax` }
							value={ value.clampMax }
							placeholder="3rem"
							onChange={ (event) => {
								onChange({
									...value,
									clampMax: event.currentTarget.value,
								})
							} }
						/>
					</FieldRow>
				</>
			) }
		</div>
	)
}
