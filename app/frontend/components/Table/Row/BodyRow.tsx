import { Table } from "@mantine/core"
import React, { type Ref } from "react"

import { usePageProps } from "@/lib/hooks"

import { RowCheckbox } from "./RowCheckbox"
import { useTableContext } from "../TableContext"

import { type TableRow } from "./index"


interface RowInContextProps extends TableRow {
	name?: string
	rows?: Record<string, any>[]
	selectable: boolean
	selected: Set<string>
}

type RowInContextPropsWithRef = RowInContextProps & {
	ref?: Ref<HTMLTableRowElement>
}

function RowInContext({ children, name, rows, selectable, selected, ref, ...props }: RowInContextPropsWithRef) {
	const { auth: { user: { table_preferences } } } = usePageProps()
	const { tableState: { model, columns } } = useTableContext()

	const length = rows?.length || 0

	return (
		<Table.Tr { ...props } ref={ ref }>
			{ selectable && length > 0 && <RowCheckbox name={ name || "" } selected={ selected } /> }

			{ children && React.Children.map(children, (cell, i) => {
				if((
					columns[i]?.hideable &&
					model &&
					table_preferences?.[model]?.hide?.[columns[i].hideable]
				)) {
					return <React.Fragment key={ columns[i]?.label } />
				}
				return React.cloneElement(cell, {
					key: columns[i]?.label,
					"data-cell": columns[i]?.label,
					role: "cell",
				})
			}) }
		</Table.Tr>
	)
}

export { RowInContext }
