import clsx from "clsx"

import { IconControlTooltip } from "../shared"
import * as classes from "./ObjectPositionGrid.css"

const OBJECT_POSITION_CELLS = [
	{ x: "0%", y: "0%", label: "Left top" },
	{ x: "50%", y: "0%", label: "Center top" },
	{ x: "100%", y: "0%", label: "Right top" },
	{ x: "0%", y: "50%", label: "Left center" },
	{ x: "50%", y: "50%", label: "Center" },
	{ x: "100%", y: "50%", label: "Right center" },
	{ x: "0%", y: "100%", label: "Left bottom" },
	{ x: "50%", y: "100%", label: "Center bottom" },
	{ x: "100%", y: "100%", label: "Right bottom" },
] as const

interface ObjectPositionGridProps {
	objectPositionX: string
	objectPositionY: string
	onChange: (next: { objectPositionX: string, objectPositionY: string }) => void
}

export function ObjectPositionGrid({
	objectPositionX,
	objectPositionY,
	onChange,
}: ObjectPositionGridProps) {
	return (
		<div className={ clsx(classes.objectPositionGrid) } role="group">
			{ OBJECT_POSITION_CELLS.map((cell) => {
				const active = cell.x === objectPositionX && cell.y === objectPositionY
				return (
					<IconControlTooltip
						key={ `${cell.x}-${cell.y}` }
						label={ cell.label }
						className={ classes.objectPositionCellHost }
					>
						<button
							type="button"
							className={ clsx(classes.objectPositionCell) }
							data-active={ active ? "true" : "false" }
							aria-label={ cell.label }
							onClick={ () => {
								onChange({
									objectPositionX: cell.x,
									objectPositionY: cell.y,
								})
							} }
						/>
					</IconControlTooltip>
				)
			}) }
		</div>
	)
}
