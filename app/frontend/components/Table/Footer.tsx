import { Table, type TableTfootProps } from "@mantine/core"
import React, { type Ref } from "react"

import { TableSectionContextProvider } from "./TableContext"

interface TableFooterProps extends TableTfootProps {}

type TableFooterPropsWithRef = TableFooterProps & {
	ref?: Ref<HTMLTableSectionElement>
}

export function Footer({ children, ref, ...props }: TableFooterPropsWithRef) {
	return (
		<TableSectionContextProvider value={ { section: "footer" } }>
			<Table.Tfoot { ...props } ref={ ref }>
				{ children }
			</Table.Tfoot>
		</TableSectionContextProvider>
	)
}
