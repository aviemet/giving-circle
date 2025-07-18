import { Table, type TableTrProps } from "@mantine/core"
import React from "react"

import { useTableContext } from "../TableContext"
import RowInContext from "./RowInContext"

export interface TableRow extends TableTrProps {
	children?: React.JSX.Element | React.JSX.Element[]
}

interface TableRowProps extends Omit<TableRow, "ref"> {
	render?: any
	name?: string
}

const Row = ({ children, render, name, ...props }: TableRowProps) => {
	const tableState = useTableContext(false)

	if(tableState === null) {
		return (
			<Table.Tr { ...props }>
				{ children }
			</Table.Tr>
		)
	}

	const { tableState: { rows, selectable, selected } } = tableState

	return (
		<RowInContext
			name={ name }
			rows={ rows }
			selectable={ selectable }
			selected={ selected }
			{ ...props }
		>
			{ children }
		</RowInContext>
	)
}

export default Row
