import clsx from "clsx"

import { Select } from "@/components/Inputs"

import * as classes from "./AlignMatrix.css"
import {
	alignMatrixCells,
	physicalAxesFromFlex,
	flexFromPhysicalAxes,
	type FlexPhysicalAxis,
} from "./alignMatrixMapping"
import { IconControlTooltip } from "./IconControlTooltip"

interface AlignMatrixProps {
	name: string
	flexDirection: "row" | "column" | undefined
	justifyContent: string | undefined
	alignItems: string | undefined
	xOptions: { value: string, label: string }[]
	yOptions: { value: string, label: string }[]
	xLabel?: string
	yLabel?: string
	onChange: (next: {
		justifyContent: string
		alignItems: string
	}) => void
}

function cellIsActive(
	cell: { x: FlexPhysicalAxis, y: FlexPhysicalAxis },
	active: { x: FlexPhysicalAxis, y: FlexPhysicalAxis } | undefined,
) {
	return active !== undefined && cell.x === active.x && cell.y === active.y
}

export function AlignMatrix({
	name,
	flexDirection,
	justifyContent,
	alignItems,
	xOptions,
	yOptions,
	xLabel = "X",
	yLabel = "Y",
	onChange,
}: AlignMatrixProps) {
	const activeCell = physicalAxesFromFlex({
		flexDirection,
		justifyContent,
		alignItems,
	})

	const direction = flexDirection ?? "row"
	const xValue = direction === "column" ? alignItems : justifyContent
	const yValue = direction === "column" ? justifyContent : alignItems

	return (
		<div className={ clsx(classes.alignMatrixRoot) }>
			<div className={ clsx(classes.alignMatrixGrid) } role="group">
				{ alignMatrixCells().map((cell) => {
					const cellKey = `${cell.x}-${cell.y}`
					const cellTitle = `${cell.x} ${cell.y}`
					return (
						<IconControlTooltip key={ cellKey } label={ cellTitle } className={ classes.alignMatrixCellHost }>
							<button
								type="button"
								className={ clsx(classes.alignMatrixCell) }
								data-active={ cellIsActive(cell, activeCell) ? "true" : "false" }
								aria-label={ cellTitle }
								onClick={ () => {
									onChange(flexFromPhysicalAxes({
										flexDirection: direction,
										x: cell.x,
										y: cell.y,
									}))
								} }
							/>
						</IconControlTooltip>
					)
				}) }
			</div>
			<div className={ clsx(classes.alignMatrixSelects) }>
				<div className={ clsx(classes.alignMatrixSelectRow) }>
					<span className={ clsx(classes.alignMatrixAxisLabel) }>{ xLabel }</span>
					<Select
						wrapper={ false }
						name={ `${name}.x` }
						value={ xValue }
						options={ xOptions }
						onChange={ (nextValue) => {
							if(!nextValue) {
								return
							}
							if(direction === "column") {
								onChange({
									justifyContent: justifyContent ?? "flex-start",
									alignItems: nextValue,
								})
								return
							}
							onChange({
								justifyContent: nextValue,
								alignItems: alignItems ?? "stretch",
							})
						} }
					/>
				</div>
				<div className={ clsx(classes.alignMatrixSelectRow) }>
					<span className={ clsx(classes.alignMatrixAxisLabel) }>{ yLabel }</span>
					<Select
						wrapper={ false }
						name={ `${name}.y` }
						value={ yValue }
						options={ yOptions }
						onChange={ (nextValue) => {
							if(!nextValue) {
								return
							}
							if(direction === "column") {
								onChange({
									justifyContent: nextValue,
									alignItems: alignItems ?? "stretch",
								})
								return
							}
							onChange({
								justifyContent: justifyContent ?? "flex-start",
								alignItems: nextValue,
							})
						} }
					/>
				</div>
			</div>
		</div>
	)
}
