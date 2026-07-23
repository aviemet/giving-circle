import { Field } from "@puckeditor/core"
import clsx from "clsx"
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
	parseNumberInputAmount,
	type DimensionInput,
	type DimensionUnit,
} from "../dimension"
import { FieldRow, IconSegmented, PuckFieldLabel } from "../shared"

function sizeText(key: string) {
	return i18n.t(`slides.editor.fields.image_size.${key}`)
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
						onChange({
							...value,
							amount: parseNumberInputAmount(nextAmount),
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
}

function ImageSizeFieldControl({ name, value, onChange }: ImageSizeFieldControlProps) {
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
			tooltip: `${sizeText("modes.natural")} — ${sizeText("mode_hints.natural")}`,
		},
		{
			value: "width",
			label: <ImageScaleWidthIcon />,
			tooltip: `${sizeText("modes.width")} — ${sizeText("mode_hints.width")}`,
		},
		{
			value: "height",
			label: <ImageScaleHeightIcon />,
			tooltip: `${sizeText("modes.height")} — ${sizeText("mode_hints.height")}`,
		},
		{
			value: "box",
			label: <ImageScaleBoxIcon />,
			tooltip: `${sizeText("modes.box")} — ${sizeText("mode_hints.box")}`,
		},
	]

	const aspectOptions = [
		{ value: "auto", label: sizeText("aspect.auto") },
		{ value: "1 / 1", label: sizeText("aspect.square") },
		{ value: "4 / 3", label: sizeText("aspect.landscape_4_3") },
		{ value: "3 / 4", label: sizeText("aspect.portrait_3_4") },
		{ value: "16 / 9", label: sizeText("aspect.wide_16_9") },
		{ value: "9 / 16", label: sizeText("aspect.tall_9_16") },
		{ value: "custom", label: sizeText("aspect.custom") },
	]

	const fitOptions = [
		{
			value: "cover",
			label: <ObjectFitCoverIcon />,
			tooltip: `${sizeText("fit.cover")} — ${sizeText("fit_hints.cover")}`,
		},
		{
			value: "contain",
			label: <ObjectFitContainIcon />,
			tooltip: `${sizeText("fit.contain")} — ${sizeText("fit_hints.contain")}`,
		},
		{
			value: "fill",
			label: <ObjectFitFillIcon />,
			tooltip: `${sizeText("fit.fill")} — ${sizeText("fit_hints.fill")}`,
		},
		{
			value: "scale-down",
			label: <ObjectFitScaleDownIcon />,
			tooltip: `${sizeText("fit.scale_down")} — ${sizeText("fit_hints.scale_down")}`,
		},
		{
			value: "none",
			label: <ObjectFitNoneIcon />,
			tooltip: `${sizeText("fit.none")} — ${sizeText("fit_hints.none")}`,
		},
	]

	return (
		<div className={ clsx(classes.imageSizeRoot) }>
			<FieldRow
				label={ sizeText("labels.mode") }
				tooltip={ sizeText("mode_hints.overview") }
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
				<FieldRow label={ sizeText("labels.width") }>
					<DimensionControl
						name={ `${name}.width` }
						value={ localValue.width }
						onChange={ (width) => updateValue({ width }) }
					/>
				</FieldRow>
			) }

			{ showHeight && (
				<FieldRow label={ sizeText("labels.height") }>
					<DimensionControl
						name={ `${name}.height` }
						value={ localValue.height }
						onChange={ (height) => updateValue({ height }) }
					/>
				</FieldRow>
			) }

			<FieldRow label={ sizeText("labels.max_width") }>
				<DimensionControl
					name={ `${name}.maxWidth` }
					value={ localValue.maxWidth }
					onChange={ (maxWidth) => updateValue({ maxWidth }) }
				/>
			</FieldRow>

			<FieldRow label={ sizeText("labels.max_height") }>
				<DimensionControl
					name={ `${name}.maxHeight` }
					value={ localValue.maxHeight }
					onChange={ (maxHeight) => updateValue({ maxHeight }) }
				/>
			</FieldRow>

			<FieldRow
				label={ sizeText("labels.aspect") }
				tooltip={ sizeText("aspect_hint") }
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
				<FieldRow label={ sizeText("labels.custom_aspect") }>
					<TextInput
						wrapper={ false }
						name={ `${name}.customAspectRatio` }
						value={ localValue.customAspectRatio }
						placeholder={ sizeText("custom_aspect_placeholder") }
						onChange={ (event) => updateValue({ customAspectRatio: event.currentTarget.value }) }
					/>
				</FieldRow>
			) }

			{ showCropControls && (
				<>
					<FieldRow label={ sizeText("labels.fit") }>
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

					<FieldRow label={ sizeText("labels.position") }>
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
	const resolvedLabel = label ?? sizeText("label")

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
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { imageSizeField }
