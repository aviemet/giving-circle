import clsx from "clsx"
import { useId, type ReactNode } from "react"

import { SegmentedControl } from "@/components/Inputs"

import { IconControlTooltip } from "./IconControlTooltip"
import * as classes from "./IconSegmented.css"

export interface IconSegmentedOption {
	value: string
	label: ReactNode
	tooltip?: string
}

interface IconSegmentedProps {
	name: string
	value: string | undefined
	options: IconSegmentedOption[]
	onChange: (value: string) => void
	className?: string
}

function optionLabel(option: IconSegmentedOption): ReactNode {
	if(option.tooltip === undefined || option.tooltip.length === 0) {
		return option.label
	}

	return (
		<IconControlTooltip label={ option.tooltip }>
			{ option.label }
		</IconControlTooltip>
	)
}

export function IconSegmented({
	name,
	value,
	options,
	onChange,
	className,
}: IconSegmentedProps) {
	const instanceId = useId()

	return (
		<SegmentedControl
			wrapper={ false }
			className={ clsx(classes.iconSegmented, className) }
			fullWidth
			withItemsBorders={ false }
			name={ `${name}${instanceId}` }
			value={ value }
			options={ options.map((option) => ({
				value: option.value,
				label: optionLabel(option),
			})) }
			onChange={ onChange }
		/>
	)
}
