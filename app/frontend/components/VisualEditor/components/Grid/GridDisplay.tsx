import clsx from "clsx"

import { Box } from "@/components"
import { usePresentationDataContext } from "@/features/presentation/PresentationDataProvider"

import { buildGridStyle } from "./buildGridStyle"
import { type GridComponentProps } from "./Grid"
import * as classes from "./Grid.css"
import { normalizeGridLayoutValue } from "../../fields/grid"
import {
	getIterateItems,
	getIteratePathPrefix,
	isIterateOn,
	RepeatedSlot,
} from "../../fields/iterate"

export function GridDisplay({
	content: Content,
	grid,
	sizing,
	puck,
	iterate,
	...styleProps
}: GridComponentProps) {
	const { dragRef } = puck
	const contextData = usePresentationDataContext()
	const iterating = isIterateOn(iterate)
	const items = getIterateItems(contextData, iterate)
	const layout = normalizeGridLayoutValue(grid)

	const gridProps = {
		style: buildGridStyle(styleProps, layout, sizing),
		ref: dragRef,
		"data-center-last-row": layout.centerLastRow ? "true" : "false",
		w: "100%",
		className: clsx(classes.grid),
	}

	if(iterating) {
		return (
			<Box { ...gridProps }>
				<RepeatedSlot
					content={ Content }
					items={ items }
					pathPrefix={ getIteratePathPrefix(iterate) }
					className={ clsx(classes.iterateCell) }
				/>
			</Box>
		)
	}

	return (
		<Box
			component={ Content }
			{ ...gridProps }
		/>
	)
}
