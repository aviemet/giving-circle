import { type TableTdProps } from "@mantine/core"
import clsx from "clsx"

import { usePageProps } from "@/lib/hooks"

import { useTableContext } from "../TableContext"
import BodyCell from "./BodyCell"


export interface TableCellProps extends TableTdProps {
	fitContent?: boolean
	sort?: string
	hideable?: false | string
	ref?: React.RefObject<HTMLTableCellElement>
	nowrap?: boolean
}

const RenderedCell = ({
	children = true,
	hideable,
	sort,
	nowrap = false,
	className,
	...props
}: TableCellProps) => {
	const { auth: { user: { table_preferences } } } = usePageProps()

	const tableState = useTableContext(false)

	let hiddenByUser: boolean = false

	if(tableState !== null) {
		const { tableState: { model } } = tableState

		const hideableString = hideable || sort
		if(hideableString !== undefined && model !== undefined) {
			hiddenByUser = table_preferences?.[model]?.hide?.[hideableString]
		}
	}

	if(hiddenByUser) return <></>

	return <BodyCell className={ clsx(className, { nowrap }) } { ...props }>{ children }</BodyCell>
}

export default RenderedCell
