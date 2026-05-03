import { Table, type TableTheadProps } from "@mantine/core"
import React, { type Ref } from "react"

import { TableSectionContextProvider } from "./TableContext"

interface TableHead extends TableTheadProps {}

type TableHeadPropsWithRef = TableHead & {
	ref?: Ref<HTMLTableSectionElement>
}

export function Head({ children, ref, ...props }: TableHeadPropsWithRef) {
	return (
		<TableSectionContextProvider value={ { section: "head" } }>
			<Table.Thead
				ref={ ref }
				{ ...props }
			>
				{ children }
			</Table.Thead>
		</TableSectionContextProvider>
	)
}
