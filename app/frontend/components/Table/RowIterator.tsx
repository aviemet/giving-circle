import clsx from "clsx"
import React from "react"

import { Row } from "./Row"
import { useTableContext } from "./TableContext"
import { RenderedCell as Cell } from "./Td"

interface RowIteratorProps {
	render: (obj: any) => React.JSX.Element
	emptyDataContent?: React.ReactNode
}

const RowIterator = ({ render, emptyDataContent }: RowIteratorProps) => {
	const { tableState: { selected, rows, columns, selectable } } = useTableContext()

	if(!rows || rows.length === 0) {
		const colSpan = columns.length + (selectable ? 1 : 0)

		return (
			<Row>
				<Cell colSpan={ colSpan } align="center">
					{ emptyDataContent || "Nothing to display" }
				</Cell>
			</Row>
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

export { RowIterator }
