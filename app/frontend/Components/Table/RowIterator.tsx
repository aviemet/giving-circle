import React from 'react'
import { useTableContext } from './TableContext'
import Table from '.'
import cx from 'clsx'

interface RowIteratorProps {
	render: (obj: any) => JSX.Element
	emptyDataContent?: React.ReactNode
}

const RowIterator = ({ render, emptyDataContent }: RowIteratorProps) => {
	const { tableState: { selected, rows, columns, selectable } } = useTableContext()

	if(!rows || rows.length === 0) {
		const colSpan = columns.length + (selectable ? 1 : 0)

		return (
			<Table.Row>
				<Table.Cell colSpan={ colSpan } align="center">
					{ emptyDataContent || 'Nothing to display' }
				</Table.Cell>
			</Table.Row>
		)
	}

	const injectRowProps = (row: JSX.Element) => {
		return React.cloneElement(row, {
			name: row.key,
			className: cx(
				{ checked: selected.has(String(row.key!)) },
			),
		})
	}

	return <>{ rows.map(row => injectRowProps(render(row))) }</>
}

export default RowIterator
