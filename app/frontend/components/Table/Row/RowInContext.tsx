import React, { type Ref } from "react"

import { useTableSectionContext } from "../TableContext"
import { RowInContext as BodyRow } from "./BodyRow"
import { HeadRow } from "./HeadRow"

import { type TableRow } from "./index"


interface RowInContextProps extends Omit<TableRow, "ref"> {
	name?: string
	rows?: Record<string, any>[]
	selectable: boolean
	selected: Set<string>
}

type RowInContextPropsWithRef = RowInContextProps & {
	ref?: Ref<HTMLTableRowElement>
}

function RowInContext({ children, ref, ...props }: RowInContextPropsWithRef) {
	const { section } = useTableSectionContext()

	return section === "head" ?
		<HeadRow ref={ ref } { ...props }>{ children }</HeadRow>
		:
		<BodyRow ref={ ref } { ...props }>{ children }</BodyRow>

}

export { RowInContext }
