import { Field } from "@puckeditor/core"
import clsx from "clsx"
import { useState } from "react"

import { i18n } from "@/lib/i18n"

import * as classes from "./headingMetrics.css"
import { FieldRow, IconSegmented, PuckFieldLabel, UnitNumber } from "../shared"
import {
	SPACING_LENGTH_UNITS,
	coerceLength,
	isLengthUnit,
	type LengthValue,
	type SpacingLengthUnit,
} from "../shared/length"

export type HeadingOrder = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingMetricsValue = {
	order: HeadingOrder
	padding: LengthValue<SpacingLengthUnit> | number
}

const HEADING_ORDERS: HeadingOrder[] = [1, 2, 3, 4, 5, 6]

function metricsText(key: string) {
	return i18n.t(`slides.editor.fields.heading_metrics.${key}`)
}

function isHeadingOrder(value: string): value is `${HeadingOrder}` {
	return HEADING_ORDERS.some((order) => String(order) === value)
}

function parseHeadingOrder(value: string): HeadingOrder | undefined {
	if(!isHeadingOrder(value)) {
		return undefined
	}
	const numericValue = Number(value)
	if(
		numericValue === 1
		|| numericValue === 2
		|| numericValue === 3
		|| numericValue === 4
		|| numericValue === 5
		|| numericValue === 6
	) {
		return numericValue
	}
	return undefined
}

export function defaultHeadingMetrics(): HeadingMetricsValue {
	return {
		order: 1,
		padding: { amount: 16, unit: "px" },
	}
}

export function normalizeHeadingMetrics(
	metrics: Partial<HeadingMetricsValue> | undefined,
): HeadingMetricsValue {
	const defaults = defaultHeadingMetrics()
	return {
		order: metrics?.order ?? defaults.order,
		padding: coerceLength(
			metrics?.padding ?? defaults.padding,
			SPACING_LENGTH_UNITS,
			"px",
		),
	}
}

interface HeadingMetricsFieldControlProps {
	name: string
	value: HeadingMetricsValue | undefined
	onChange: (value: HeadingMetricsValue) => void
}

function HeadingMetricsFieldControl({ name, value, onChange }: HeadingMetricsFieldControlProps) {
	const [localValue, setLocalValue] = useState<HeadingMetricsValue>(() => normalizeHeadingMetrics(value))

	const updateValue = (patch: Partial<HeadingMetricsValue>) => {
		const next = {
			...localValue,
			...patch,
		}
		setLocalValue(next)
		onChange(next)
	}

	const padding = coerceLength(localValue.padding, SPACING_LENGTH_UNITS, "px")

	return (
		<div className={ clsx(classes.metricsRoot) }>
			<FieldRow label={ metricsText("labels.level") }>
				<IconSegmented
					className={ clsx(classes.levelSegmented) }
					name={ `${name}.order` }
					value={ String(localValue.order) }
					options={ HEADING_ORDERS.map((order) => ({
						value: String(order),
						label: `H${order}`,
					})) }
					onChange={ (nextValue) => {
						const order = parseHeadingOrder(nextValue)
						if(order !== undefined) {
							updateValue({ order })
						}
					} }
				/>
			</FieldRow>

			<FieldRow label={ metricsText("labels.padding") }>
				<UnitNumber
					name={ `${name}.padding` }
					value={ padding.amount }
					unit={ padding.unit }
					units={ SPACING_LENGTH_UNITS }
					onChange={ (amount) => updateValue({
						padding: { amount, unit: padding.unit },
					}) }
					onUnitChange={ (unit) => {
						if(!isLengthUnit(unit, SPACING_LENGTH_UNITS)) {
							return
						}
						updateValue({
							padding: { amount: padding.amount, unit },
						})
					} }
				/>
			</FieldRow>
		</div>
	)
}

export function headingMetricsField(): Field<HeadingMetricsValue | undefined> {
	const label = metricsText("label")
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ label }>
					<HeadingMetricsFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}
