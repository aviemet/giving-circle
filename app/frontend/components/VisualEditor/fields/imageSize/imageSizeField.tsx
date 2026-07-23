import { Field } from "@puckeditor/core"
import clsx from "clsx"
import { type TFunction } from "i18next"
import { useState } from "react"

import {
	ImageScaleBoxIcon,
	ImageScaleHeightIcon,
	ImageScaleNaturalIcon,
	ImageScaleWidthIcon,
	ObjectFitContainIcon,
	ObjectFitCoverIcon,
	ObjectFitFillIcon,
	ObjectFitNoneIcon,
	ObjectFitScaleDownIcon,
} from "@/components/Icons"
import { NumberInput, Select, TextInput } from "@/components/Inputs"
import { i18n } from "@/lib/i18n"

import {
	applyImageScaleMode,
	defaultImageSize,
	imageDimensionUnits,
	imageSizeUsesCropBox,
	isImageAspectRatio,
	isImageObjectFit,
	isImageScaleMode,
	normalizeImageSize,
	type ImageSizeValue,
} from "./imageSize"
import * as classes from "./imageSizeField.css"
import { ObjectPositionGrid } from "./ObjectPositionGrid"
import {
	type DimensionInput,
	type DimensionUnit,
} from "../dimension"
import { FieldRow, IconSegmented, PuckFieldLabel } from "../shared"

function sizeText(t: TFunction, key: string) {
	return t(`slides.editor.fields.image_size.${key}`)
}

function isDimensionUnit(value: string): value is DimensionUnit {
	return imageDimensionUnits().some((unit) => unit === value)
}

interface DimensionControlProps {
	name: string
	value: DimensionInput
	onChange: (value: DimensionInput) => void
}

function DimensionControl({ name, value, onChange }: DimensionControlProps) {
	const showAmount = value.unit !== "auto"

	return (
		<div className={ clsx(showAmount ? classes.dimensionControl : classes.dimensionControlUnitOnly) }>
			{ showAmount && (
				<NumberInput
					wrapper={ false }
					name={ `${name}.amount` }
					value={ value.amount }
					min={ 0 }
					step={ 1 }
					onChange={ (nextAmount) => {
						const numericValue = typeof nextAmount === "number" ? nextAmount : Number(nextAmount)
						onChange({
							...value,
							amount: Number.isNaN(numericValue) ? undefined : numericValue,
						})
					} }
				/>
			) }
			<Select
				wrapper={ false }
				name={ `${name}.unit` }
				value={ value.unit }
				options={ imageDimensionUnits().map((unit) => ({ value: unit, label: unit })) }
				onChange={ (nextUnit) => {
					if(!nextUnit || !isDimensionUnit(nextUnit)) {
						return
					}
					if(nextUnit === "auto") {
						onChange({ unit: "auto" })
						return
					}
					onChange({
						amount: value.amount,
						unit: nextUnit,
					})
				} }
			/>
		</div>
	)
}

interface ImageSizeFieldControlProps {
	name: string
	value: ImageSizeValue | undefined
	onChange: (value: ImageSizeValue) => void
	t: TFunction
}

function ImageSizeFieldControl({ name, value, onChange, t }: ImageSizeFieldControlProps) {
	const [localValue, setLocalValue] = useState<ImageSizeValue>(() => normalizeImageSize(value))

	const commit = (next: ImageSizeValue) => {
		setLocalValue(next)
		onChange(next)
	}

	const updateValue = (patch: Partial<ImageSizeValue>) => {
		commit(normalizeImageSize({
			...localValue,
			...patch,
		}))
	}

	const showWidth = localValue.mode === "width" || localValue.mode === "box"
	const showHeight = localValue.mode === "height" || localValue.mode === "box"
	const showCropControls = imageSizeUsesCropBox(localValue)

	const modeOptions = [
		{
			value: "natural",
			label: <ImageScaleNaturalIcon />,
			tooltip: `${sizeText(t, "modes.natural")} — ${sizeText(t, "mode_hints.natural")}`,
		},
		{
			value: "width",
			label: <ImageScaleWidthIcon />,
			tooltip: `${sizeText(t, "modes.width")} — ${sizeText(t, "mode_hints.width")}`,
		},
		{
			value: "height",
			label: <ImageScaleHeightIcon />,
			tooltip: `${sizeText(t, "modes.height")} — ${sizeText(t, "mode_hints.height")}`,
		},
		{
			value: "box",
			label: <ImageScaleBoxIcon />,
			tooltip: `${sizeText(t, "modes.box")} — ${sizeText(t, "mode_hints.box")}`,
		},
	]

	const aspectOptions = [
		{ value: "auto", label: sizeText(t, "aspect.auto") },
		{ value: "1 / 1", label: sizeText(t, "aspect.square") },
		{ value: "4 / 3", label: sizeText(t, "aspect.landscape_4_3") },
		{ value: "3 / 4", label: sizeText(t, "aspect.portrait_3_4") },
		{ value: "16 / 9", label: sizeText(t, "aspect.wide_16_9") },
		{ value: "9 / 16", label: sizeText(t, "aspect.tall_9_16") },
		{ value: "custom", label: sizeText(t, "aspect.custom") },
	]

	const fitOptions = [
		{
			value: "cover",
			label: <ObjectFitCoverIcon />,
			tooltip: `${sizeText(t, "fit.cover")} — ${sizeText(t, "fit_hints.cover")}`,
		},
		{
			value: "contain",
			label: <ObjectFitContainIcon />,
			tooltip: `${sizeText(t, "fit.contain")} — ${sizeText(t, "fit_hints.contain")}`,
		},
		{
			value: "fill",
			label: <ObjectFitFillIcon />,
			tooltip: `${sizeText(t, "fit.fill")} — ${sizeText(t, "fit_hints.fill")}`,
		},
		{
			value: "scale-down",
			label: <ObjectFitScaleDownIcon />,
			tooltip: `${sizeText(t, "fit.scale_down")} — ${sizeText(t, "fit_hints.scale_down")}`,
		},
		{
			value: "none",
			label: <ObjectFitNoneIcon />,
			tooltip: `${sizeText(t, "fit.none")} — ${sizeText(t, "fit_hints.none")}`,
		},
	]

	return (
		<div className={ clsx(classes.imageSizeRoot) }>
			<FieldRow
				label={ sizeText(t, "labels.mode") }
				tooltip={ sizeText(t, "mode_hints.overview") }
			>
				<IconSegmented
					name={ `${name}.mode` }
					value={ localValue.mode }
					options={ modeOptions }
					onChange={ (nextValue) => {
						if(!isImageScaleMode(nextValue)) {
							return
						}
						commit(applyImageScaleMode(localValue, nextValue))
					} }
				/>
			</FieldRow>

			{ showWidth && (
				<FieldRow label={ sizeText(t, "labels.width") }>
					<DimensionControl
						name={ `${name}.width` }
						value={ localValue.width }
						onChange={ (width) => updateValue({ width }) }
					/>
				</FieldRow>
			) }

			{ showHeight && (
				<FieldRow label={ sizeText(t, "labels.height") }>
					<DimensionControl
						name={ `${name}.height` }
						value={ localValue.height }
						onChange={ (height) => updateValue({ height }) }
					/>
				</FieldRow>
			) }

			<FieldRow label={ sizeText(t, "labels.max_width") }>
				<DimensionControl
					name={ `${name}.maxWidth` }
					value={ localValue.maxWidth }
					onChange={ (maxWidth) => updateValue({ maxWidth }) }
				/>
			</FieldRow>

			<FieldRow label={ sizeText(t, "labels.max_height") }>
				<DimensionControl
					name={ `${name}.maxHeight` }
					value={ localValue.maxHeight }
					onChange={ (maxHeight) => updateValue({ maxHeight }) }
				/>
			</FieldRow>

			<FieldRow
				label={ sizeText(t, "labels.aspect") }
				tooltip={ sizeText(t, "aspect_hint") }
			>
				<Select
					wrapper={ false }
					name={ `${name}.aspectRatio` }
					value={ localValue.aspectRatio }
					options={ aspectOptions }
					onChange={ (nextValue) => {
						if(!nextValue || !isImageAspectRatio(nextValue)) {
							return
						}
						updateValue({ aspectRatio: nextValue })
					} }
				/>
			</FieldRow>

			{ localValue.aspectRatio === "custom" && (
				<FieldRow label={ sizeText(t, "labels.custom_aspect") }>
					<TextInput
						wrapper={ false }
						name={ `${name}.customAspectRatio` }
						value={ localValue.customAspectRatio }
						placeholder={ sizeText(t, "custom_aspect_placeholder") }
						onChange={ (event) => updateValue({ customAspectRatio: event.currentTarget.value }) }
					/>
				</FieldRow>
			) }

			{ showCropControls && (
				<>
					<FieldRow label={ sizeText(t, "labels.fit") }>
						<IconSegmented
							name={ `${name}.objectFit` }
							value={ localValue.objectFit }
							options={ fitOptions }
							onChange={ (nextValue) => {
								if(!isImageObjectFit(nextValue)) {
									return
								}
								updateValue({ objectFit: nextValue })
							} }
						/>
					</FieldRow>

					<FieldRow label={ sizeText(t, "labels.position") }>
						<ObjectPositionGrid
							objectPositionX={ localValue.objectPositionX }
							objectPositionY={ localValue.objectPositionY }
							onChange={ ({ objectPositionX, objectPositionY }) => {
								updateValue({ objectPositionX, objectPositionY })
							} }
						/>
					</FieldRow>
				</>
			) }
		</div>
	)
}

function imageSizeField(): Field<ImageSizeValue | undefined>
function imageSizeField(params: Partial<Field<ImageSizeValue | undefined>>): Field<ImageSizeValue | undefined>
function imageSizeField({
	label,
}: Partial<Field<ImageSizeValue | undefined>> = {}): Field<ImageSizeValue | undefined> {
	const t = i18n.t.bind(i18n)
	const resolvedLabel = label ?? sizeText(t, "label")

	return {
		type: "custom",
		label: resolvedLabel,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ resolvedLabel }>
					<ImageSizeFieldControl
						name={ name }
						value={ value ?? defaultImageSize() }
						onChange={ onChange }
						t={ t }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { imageSizeField }
