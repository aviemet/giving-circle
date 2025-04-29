import { Table } from "@mantine/core"
import cx from "clsx"
import React, { useRef } from "react"

import { type TableCellProps } from "."

export interface BodyCellWithContextProps extends Omit<TableCellProps, "hideable"> {
	hideable?: false | string
	model?: string
}

const BodyCellWithContext = ({
	children,
	fitContent,
	hideable,
	model,
	className,
	...props
}: BodyCellWithContextProps) => {
	const tdRef = useRef<HTMLTableCellElement>(null)

	return (
		<Table.Td
			ref={ tdRef }
			className={ cx({ "table-column-fit": fitContent }, className) }
			{ ...props }
		>
			{ children }
		</Table.Td>
	)
}

export default BodyCellWithContext
