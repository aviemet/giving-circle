import {
	SegmentedControl as MantineSegmentedControl,
	type SegmentedControlProps as MantineSegmentedControlProps,
	type SegmentedControlItem,
} from "@mantine/core"
import React from "react"

import { InputWrapper } from "./InputWrapper"
import { Label } from "./Label"

import { type BaseInputProps } from "."

export interface SegmentedControlProps
	extends
	Omit<MantineSegmentedControlProps, "data">,
	Omit<BaseInputProps, "disableAutofill"> {
	ref?: React.Ref<HTMLDivElement>
	label?: string
	labelPosition?: "start" | "end"
	name: string
	options: SegmentedControlItem[]
	id?: string
	required?: boolean
}

export function SegmentedControl({
	label,
	labelPosition = "start",
	options,
	name,
	id,
	value,
	required,
	onChange,
	wrapper,
	ref,
	color,
	...props
}: SegmentedControlProps) {
	return (
		<InputWrapper wrapper={ wrapper }>
			{ label && labelPosition === "start" &&
				<Label required={ required } htmlFor={ id }>{ label }</Label>
			}
			<MantineSegmentedControl
				ref={ ref }
				value={ value }
				onChange={ (choice: string) => {
					onChange?.(choice)
				} }
				data={ options }
				color={ color }
				{ ...props }
			/>
			{ label && labelPosition === "end" &&
				<Label required={ required } htmlFor={ id }>{ label }</Label>
			}
		</InputWrapper>
	)
}
