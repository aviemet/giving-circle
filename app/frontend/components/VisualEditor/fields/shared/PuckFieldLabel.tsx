import { FieldLabel } from "@puckeditor/core"
import { type ReactNode } from "react"

import * as classes from "../puckFieldStyles.css"

interface PuckFieldLabelProps {
	label: string
	children?: ReactNode
	readOnly?: boolean
	icon?: ReactNode
}

export function PuckFieldLabel({ label, children, readOnly, icon }: PuckFieldLabelProps) {
	return (
		<FieldLabel
			label={ label }
			el="div"
			readOnly={ readOnly }
			icon={ icon }
			className={ classes.puckFieldLabel }
		>
			{ children }
		</FieldLabel>
	)
}
