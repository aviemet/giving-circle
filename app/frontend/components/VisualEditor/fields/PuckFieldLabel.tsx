import { FieldLabel } from "@measured/puck"
import { type ReactNode } from "react"

import { puckFieldClassNames } from "../puckFieldStyles"

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
			className={ puckFieldClassNames.fieldLabel }
		>
			{ children }
		</FieldLabel>
	)
}
