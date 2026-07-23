import { Field } from "@puckeditor/core"
import { useState } from "react"

import { i18n } from "@/lib/i18n"

import * as classes from "./headingMetrics.css"
import { FieldRow, IconSegmented, PuckFieldLabel, UnitNumber } from "../shared"

export type HeadingOrder = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingMetricsValue = {
	order: HeadingOrder
	padding: number
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
		padding: 16,
	}
}

export function normalizeHeadingMetrics(
	metrics: Partial<HeadingMetricsValue> | undefined,
	legacy?: {
		order?: HeadingOrder
		padding?: number
	},
): HeadingMetricsValue {
	const defaults = defaultHeadingMetrics()
	return {
		order: metrics?.order ?? legacy?.order ?? defaults.order,
		padding: metrics?.padding ?? legacy?.padding ?? defaults.padding,
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

	return (
		<div className={ classes.metricsRoot }>
			<FieldRow label={ metricsText("labels.level") }>
				<IconSegmented
					className={ classes.levelSegmented }
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
					value={ localValue.padding }
					onChange={ (padding) => updateValue({ padding }) }
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
