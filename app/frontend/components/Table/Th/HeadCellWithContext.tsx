import { Table } from "@mantine/core"
import clsx from "clsx"
import React, { useMemo, useRef } from "react"

import { Link, Flex } from "@/components"
import { useLocation } from "@/lib/hooks"

import { type TableHeadCellProps } from "."

interface HeadCellWithContextProps extends TableHeadCellProps {
	rows?: Record<string, any>[]
}

const HeadCellWithContext = ({
	children,
	fitContent = false,
	sort,
	rows,
	hideable,
	...props
}: HeadCellWithContextProps) => {
	const thRef = useRef<HTMLTableCellElement>(null)
	const { pathname, params } = useLocation()

	const localParams = new URLSearchParams(params)

	const paramsSort = localParams.get("sort")
	const paramsDirection = localParams.get("direction")

	const direction = paramsSort === sort && paramsDirection === "asc" ? "desc" : "asc"

	const showSortLink: boolean = sort !== undefined && rows!.length > 1

	// Use URLSearchParams object to build sort link per head cell
	const sortLink = useMemo(() => {
		if(!showSortLink) return undefined

		if(sort === undefined) {
			localParams.delete("sort")
			return undefined
		}

		localParams.set("sort", sort)

		localParams.set("direction", direction)

		return `${pathname}?${localParams.toString()}`
	}, [showSortLink, sort, direction, pathname])

	return (
		<Table.Th
			ref={ thRef }
			className={ clsx(
				{ "table-column-fit": fitContent },
				{ "sortable": showSortLink },
				{ [direction]: showSortLink && paramsSort === sort },
			) }
			{ ...props }
		>
			<Flex align="center">
				{ showSortLink && sortLink ?
					<Link
						href={ sortLink }
						preserveScroll={ true }
					>
						{ children }
					</Link>
					:
					children
				}
			</Flex>
		</Table.Th>
	)
}

export default HeadCellWithContext
