import clsx from "clsx"
import React from "react"

import { useTableContext } from "./TableContext"

import Table from "."

interface RowIteratorProps {
	render: (obj: any) => React.JSX.Element
	emptyDataContent?: React.ReactNode
}

const RowIterator = ({ render, emptyDataContent }: RowIteratorProps) => {
	const { tableState: { selected, rows, columns, selectable } } = useTableContext()

	if(!rows || rows.length === 0) {
		const colSpan = columns.length + (selectable ? 1 : 0)

		return (
			<Table.Row>
				<Table.Cell colSpan={ colSpan } align="center">
					{ emptyDataContent || "Nothing to display" }
				</Table.Cell>
			</Table.Row>
		)
	}

	const injectRowProps = (row: React.JSX.Element) => {
		return React.cloneElement(row, {
			name: row.key,
			className: clsx(
				{ checked: selected.has(String(row.key!)) },
			),
		})
	}

	return <>{ rows.map(row => injectRowProps(render(row))) }</>
}

export default RowIterator
