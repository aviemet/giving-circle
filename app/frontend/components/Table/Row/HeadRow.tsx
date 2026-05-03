import { Table } from "@mantine/core"
import React, { useEffect, type Ref } from "react"

import { useCheckboxState } from "@/lib/hooks"

import { HeadCheckbox } from "./HeadCheckbox"
import { coerceArray } from "../../../lib/index"
import { useTableContext } from "../TableContext"

import { type TableRow } from "./index"

interface HeadRowProps extends TableRow {
	name?: string
	rows?: Record<string, any>[]
	selectable: boolean
	selected: Set<string>
}

type HeadRowPropsWithRef = HeadRowProps & {
	ref?: Ref<HTMLTableRowElement>
}

function HeadRow({ children, name, rows, selectable, selected, ref, ...props }: HeadRowPropsWithRef) {
	const { tableState: { columns }, setTableState } = useTableContext()

	let { length, selectedCount } = { length: 0, selectedCount: 0 }
	if(selectable) {
		length = rows?.length || 0
		selectedCount = selected.size || 0
	}
	const { allChecked, indeterminate } = useCheckboxState(length, selectedCount)

	// Register hideable attributes in context
	useEffect(() => {
		if(!children) return

		coerceArray(children).forEach(({ props }, i) => {
			const hideable = (props.hideable ?? props.sort) ?? false
			columns[i] = { label: props.children, hideable }
		})
		setTableState({ columns })
	}, [])

	return (
		<Table.Tr { ...props } ref={ ref }>
			{ selectable && <HeadCheckbox
				rows={ rows }
				selected={ selected }
				allChecked={ allChecked }
				indeterminate={ indeterminate }
			/> }
			{ children }
		</Table.Tr>
	)
}

export { HeadRow }
