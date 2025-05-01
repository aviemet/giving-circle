import { Box, BoxProps } from "@mantine/core"
import clsx from "clsx"

import { type InputType } from "@/types"

export interface FieldProps extends BoxProps {
	children: React.ReactNode
	type?: InputType
	required?: boolean
	errors?: boolean
}

const Field = ({
	children,
	type,
	required = false,
	errors = false,
	className,
	...props
}: FieldProps) => {
	return (
		<Box
			className={ clsx(
				"field",
				{ [String(type)]: type },
				{ "required": required },
				{ "field_with_errors": errors },
				className,
			) }
			{ ...props }
		>
			{ children }
		</Box>
	)
}

export default Field
