import clsx from "clsx"
import { type ReactNode } from "react"

import * as classes from "./FieldRow.css"
import { IconControlTooltip } from "./IconControlTooltip"

interface FieldRowProps {
	label: string
	children: ReactNode
	className?: string
	tooltip?: string
}

export function FieldRow({ label, children, className, tooltip }: FieldRowProps) {
	const labelNode = tooltip === undefined || tooltip.length === 0
		? label
		: (
			<IconControlTooltip label={ tooltip } className={ classes.fieldRowLabelTarget }>
				{ label }
			</IconControlTooltip>
		)

	return (
		<div className={ clsx(classes.fieldRow, className) }>
			<div className={ clsx(classes.fieldRowLabel) }>{ labelNode }</div>
			<div className={ clsx(classes.fieldRowControl) }>{ children }</div>
		</div>
	)
}
