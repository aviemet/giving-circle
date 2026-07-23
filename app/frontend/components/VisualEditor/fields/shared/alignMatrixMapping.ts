export type FlexAlignAxisValue = "flex-start" | "center" | "flex-end" | "stretch" | "space-between" | "space-around"

export type FlexPhysicalAxis = "start" | "center" | "end"

export type AlignMatrixCell = {
	x: FlexPhysicalAxis
	y: FlexPhysicalAxis
}

const PHYSICAL_AXES: FlexPhysicalAxis[] = ["start", "center", "end"]

function physicalFromCss(value: string | undefined): FlexPhysicalAxis | undefined {
	if(value === "flex-start" || value === "start") {
		return "start"
	}
	if(value === "center") {
		return "center"
	}
	if(value === "flex-end" || value === "end") {
		return "end"
	}
	return undefined
}

function cssFromPhysical(axis: FlexPhysicalAxis): "flex-start" | "center" | "flex-end" {
	if(axis === "start") {
		return "flex-start"
	}
	if(axis === "end") {
		return "flex-end"
	}
	return "center"
}

export function alignMatrixCells(): AlignMatrixCell[] {
	const cells: AlignMatrixCell[] = []
	for(const y of PHYSICAL_AXES) {
		for(const x of PHYSICAL_AXES) {
			cells.push({ x, y })
		}
	}
	return cells
}

export function physicalAxesFromFlex(params: {
	flexDirection: "row" | "column" | undefined
	justifyContent: string | undefined
	alignItems: string | undefined
}): AlignMatrixCell | undefined {
	const direction = params.flexDirection ?? "row"
	const justify = physicalFromCss(params.justifyContent)
	const align = physicalFromCss(params.alignItems)
	if(!justify || !align) {
		return undefined
	}

	if(direction === "column") {
		return { x: align, y: justify }
	}

	return { x: justify, y: align }
}

export function flexFromPhysicalAxes(params: {
	flexDirection: "row" | "column" | undefined
	x: FlexPhysicalAxis
	y: FlexPhysicalAxis
}): {
	justifyContent: "flex-start" | "center" | "flex-end"
	alignItems: "flex-start" | "center" | "flex-end"
} {
	const direction = params.flexDirection ?? "row"
	const xCss = cssFromPhysical(params.x)
	const yCss = cssFromPhysical(params.y)

	if(direction === "column") {
		return {
			justifyContent: yCss,
			alignItems: xCss,
		}
	}

	return {
		justifyContent: xCss,
		alignItems: yCss,
	}
}

export function physicalAxisSelectOptions(includeStretch: boolean) {
	const options: { value: FlexAlignAxisValue, labelKey: string }[] = [
		{ value: "flex-start", labelKey: "start" },
		{ value: "center", labelKey: "center" },
		{ value: "flex-end", labelKey: "end" },
	]
	if(includeStretch) {
		options.push({ value: "stretch", labelKey: "stretch" })
	}
	return options
}

export function justifySelectOptions() {
	return [
		{ value: "flex-start" as const, labelKey: "start" },
		{ value: "center" as const, labelKey: "center" },
		{ value: "flex-end" as const, labelKey: "end" },
		{ value: "space-between" as const, labelKey: "space_between" },
		{ value: "space-around" as const, labelKey: "space_around" },
	]
}
